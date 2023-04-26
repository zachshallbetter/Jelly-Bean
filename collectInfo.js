const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

console.log('Package.json dependencies:');
console.log(packageJson.dependencies);

console.log('\nPackage.json devDependencies:');
console.log(packageJson.devDependencies);

console.log('\nProject structure:');
fs.readdirSync(__dirname).forEach(file => {
    console.log(file);
});
