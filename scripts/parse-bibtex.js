/**
 * BibTeX Parser Script
 * Run this with: node scripts/parse-bibtex.js
 * 
 * This script reads publications.bib and generates TypeScript code
 * that you can copy into data/publications.ts
 */

const fs = require('fs');
const path = require('path');

// Read the .bib file
const bibPath = path.join(__dirname, '../data/publications.bib');
const bibContent = fs.readFileSync(bibPath, 'utf-8');

// Parse BibTeX entries
function parseBibtex(content) {
  const publications = [];
  
  // Split entries by @EntryType{
  const entryMatches = content.matchAll(/@(\w+)\s*\{\s*\n?\s*([^,\s]+),\s*([\s\S]*?)(?=\n@|\n*$)/g);
  
  for (const match of entryMatches) {
    const [fullMatch, entryType, citationKey, fieldsContent] = match;
    
    // Skip if this is just a comment
    if (!citationKey || citationKey.startsWith('%')) continue;
    
    const entry = {
      id: citationKey.trim(),
      bibtex: '@' + entryType + '{' + citationKey + ',' + fieldsContent + '}',
      rawType: entryType.toLowerCase()
    };
    
    // Parse fields - improved regex to handle multiline values
    const lines = fieldsContent.split('\n');
    let currentField = '';
    let currentValue = '';
    let inField = false;
    let braceCount = 0;
    
    for (let line of lines) {
      line = line.trim();
      
      // Skip empty lines and closing braces
      if (!line || line === '}') continue;
      
      // Check if this is a new field (fieldname = {)
      const fieldMatch = line.match(/^(\w+)\s*=\s*\{(.*)$/);
      
      if (fieldMatch && braceCount === 0) {
        // Save previous field if exists
        if (currentField && currentValue) {
          processField(entry, currentField, currentValue.trim());
        }
        
        // Start new field
        currentField = fieldMatch[1].toLowerCase();
        currentValue = fieldMatch[2];
        
        // Count braces
        braceCount = (currentValue.match(/\{/g) || []).length - (currentValue.match(/\}/g) || []).length;
        
        // If value ends with }, we're done with this field
        if (line.endsWith('},') || line.endsWith('}')) {
          currentValue = currentValue.replace(/\}[,\s]*$/, '');
          processField(entry, currentField, currentValue.trim());
          currentField = '';
          currentValue = '';
          braceCount = 0;
        }
      } else if (inField || braceCount > 0) {
        // Continue multiline value
        currentValue += ' ' + line;
        braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        
        if (braceCount <= 0 && (line.endsWith('},') || line.endsWith('}'))) {
          currentValue = currentValue.replace(/\}[,\s]*$/, '');
          processField(entry, currentField, currentValue.trim());
          currentField = '';
          currentValue = '';
          braceCount = 0;
          inField = false;
        } else {
          inField = true;
        }
      }
    }
    
    // Process last field if exists
    if (currentField && currentValue) {
      processField(entry, currentField, currentValue.trim());
    }
    
    // Determine publication type
    const typeMap = {
      'article': 'Journal',
      'inproceedings': 'Conference',
      'incollection': 'Book Chapter',
      'misc': 'Preprint',
      'mastersthesis': 'Book Chapter',
      'phdthesis': 'Book Chapter'
    };
    
    entry.type = typeMap[entry.rawType] || 'Conference';
    
    // Only add if we have minimum required fields
    if (entry.title && entry.authors && entry.year) {
      // Ensure venue exists
      if (!entry.venue) {
        entry.venue = entry.publisher || 'Unknown Venue';
      }
      
      // Enhance venue with volume/issue if available
      if (entry.volume || entry.issue) {
        let venueDetails = entry.venue;
        if (entry.volume) venueDetails += `, Vol. ${entry.volume}`;
        if (entry.issue) venueDetails += `, No. ${entry.issue}`;
        entry.venue = venueDetails;
      }
      
      publications.push(entry);
    }
  }
  
  return publications;
}

function processField(entry, key, value) {
  switch (key) {
    case 'title':
      entry.title = value;
      break;
    case 'author':
      // Split by 'and' and format names
      entry.authors = value.split(' and ').map(a => {
        const cleaned = a.trim();
        // Keep "Lastname, Firstname" format if already present
        if (cleaned.includes(',')) {
          const parts = cleaned.split(',');
          const lastName = parts[0].trim();
          const firstName = parts[1].trim();
          return `${lastName}, ${firstName.charAt(0)}.`;
        }
        // Convert "Firstname Lastname" to "Lastname, F."
        const parts = cleaned.split(' ');
        if (parts.length >= 2) {
          const lastName = parts[parts.length - 1];
          const firstName = parts[0];
          return `${lastName}, ${firstName.charAt(0)}.`;
        }
        return cleaned;
      });
      break;
    case 'year':
      entry.year = parseInt(value);
      break;
    case 'journal':
      entry.venue = value;
      break;
    case 'booktitle':
      if (!entry.venue) entry.venue = value;
      break;
    case 'venue':
      if (!entry.venue) entry.venue = value;
      break;
    case 'publisher':
      entry.publisher = value;
      if (!entry.venue) entry.venue = value;
      break;
    case 'doi':
      entry.doi = value;
      if (!entry.url) entry.url = `https://doi.org/${value}`;
      break;
    case 'url':
      if (!entry.url) entry.url = value;
      break;
    case 'volume':
      entry.volume = value;
      break;
    case 'issue':
    case 'number':
      entry.issue = value;
      break;
    case 'pages':
      entry.pages = value;
      break;
    case 'series':
      entry.series = value;
      break;
    case 'award':
      entry.award = value;
      break;
    case 'invited':
      // Parse boolean values: true/yes/1 = true, everything else = false
      const invitedValue = value.toLowerCase().trim();
      entry.invited = invitedValue === 'true' || invitedValue === 'yes' || invitedValue === '1';
      break;
  }
}

// Generate TypeScript code
function generateTypeScriptCode(publications) {
  let output = "import type { Publication } from './publications';\n\n";
  output += 'export const publications: Publication[] = [\n';
  
  publications.forEach((pub, index) => {
    output += '  {\n';
    output += `    id: "${pub.id}",\n`;
    output += `    title: "${escapeString(pub.title)}",\n`;
    output += `    authors: [${pub.authors.map(a => `"${escapeString(a)}"`).join(', ')}],\n`;
    output += `    venue: "${escapeString(pub.venue)}",\n`;
    output += `    year: ${pub.year},\n`;
    output += `    type: "${pub.type}",\n`;
    
    if (pub.doi) {
      output += `    doi: "${pub.doi}",\n`;
    }
    if (pub.url) {
      output += `    url: "${pub.url}",\n`;
    }
    if (pub.award) {
      output += `    award: "${escapeString(pub.award)}",\n`;
    }
    if (pub.invited) {
      output += `    invited: ${pub.invited},\n`;
    }
    
    // Add bibtex (escape properly)
    const escapedBibtex = pub.bibtex.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    output += `    bibtex: \`${escapedBibtex}\`\n`;
    
    output += '  }';
    if (index < publications.length - 1) {
      output += ',';
    }
    output += '\n';
  });
  
  output += '];\n';
  
  return output;
}

function escapeString(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
}

// Main execution
try {
  console.log('Parsing publications.bib...\n');
  
  const publications = parseBibtex(bibContent);
  
  console.log(`✅ Found ${publications.length} publications\n`);
  
  if (publications.length === 0) {
    console.log('⚠️  No publications were parsed. Check the BibTeX format.\n');
    process.exit(1);
  }
  
  // Sort by year (most recent first)
  publications.sort((a, b) => b.year - a.year);
  
  // Show summary
  console.log('Publications by year:');
  const byYear = {};
  publications.forEach(pub => {
    if (!byYear[pub.year]) byYear[pub.year] = 0;
    byYear[pub.year]++;
  });
  Object.keys(byYear).sort((a, b) => b - a).forEach(year => {
    console.log(`  ${year}: ${byYear[year]} publications`);
  });
  
  console.log('\nPublications by type:');
  const byType = {};
  publications.forEach(pub => {
    if (!byType[pub.type]) byType[pub.type] = 0;
    byType[pub.type]++;
  });
  Object.keys(byType).sort().forEach(type => {
    console.log(`  ${type}: ${byType[type]} publications`);
  });
  
  // Generate TypeScript code
  const tsCode = generateTypeScriptCode(publications);
  
  // Write to output file
  const outputPath = path.join(__dirname, '../data/publications-generated.ts');
  fs.writeFileSync(outputPath, tsCode, 'utf-8');
  
  console.log(`\n✅ Generated TypeScript code saved to: data/publications-generated.ts`);
  console.log(`   Total size: ${Math.round(tsCode.length / 1024)} KB`);
  console.log('\nNext steps:');
  console.log('1. Review the generated file: data/publications-generated.ts');
  console.log('2. Update data/publications.ts:');
  console.log('   - Keep the interface and helper functions');
  console.log('   - Replace only the publications array with the generated one');
  console.log('3. Update YOUR_NAME constant to: "Filipov, V." or "Velitchko Filipov"');
  console.log('\n👉 You can also import the generated file directly!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
