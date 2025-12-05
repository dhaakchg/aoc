const path = require('path');
const fs = require('fs');

const TEMPLATE_DIR = path.join(__dirname, '..', 'src', 'template');

const createDayFiles = (year, day) => {
  day = String(day).padStart(2, '0');
  year = String(year);

  const yearDir = path.join(__dirname, '..', 'src', year);

  // Ensure directories exist
  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
  }

  // Copy and update solution file
  const templateSolutionFile = path.join(TEMPLATE_DIR, '00.js');
  const templateTestFile = path.join(TEMPLATE_DIR, '00.test.js');
  const targetSolutionFile = path.join(yearDir, `${day}.js`);
  const targetTestFile = path.join(yearDir, `${day}.test.js`);

  if (fs.existsSync(templateSolutionFile)) {
    let content = fs.readFileSync(templateSolutionFile, 'utf8');
    fs.writeFileSync(targetSolutionFile, content, 'utf8');
    console.log(`Created solution file: ${targetSolutionFile}`);

    // Update import path based on year/day
    content = fs.readFileSync(templateTestFile, 'utf8');
    content = content.replace('require(\'./00\')', `require('./${day}')`)
      .replace('Day 0', `Day ${day}`);
    fs.writeFileSync(targetTestFile, content, 'utf8');
    console.log(`Created solution file: ${targetTestFile}`);
  }
};

const year = process.argv[2];
const day = process.argv[3];

if (!year || !day) {
  console.error('Usage: node scripts/createDay.js <year> <day>');
  process.exit(1);
}

createDayFiles(year, day);