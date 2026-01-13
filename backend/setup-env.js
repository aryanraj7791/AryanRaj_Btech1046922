const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

const jwtSecret = crypto.randomBytes(64).toString('hex');

const defaultEnv = {
  PORT: '5000',
  MONGODB_URI: 'mongodb://localhost:27017/task_management',
  JWT_SECRET: jwtSecret,
  JWT_EXPIRE: '7d',
  NODE_ENV: 'development'
};

const existingVars = {};
if (envContent) {
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        existingVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
}

const finalEnv = { ...defaultEnv, ...existingVars };

if (!finalEnv.JWT_SECRET || finalEnv.JWT_SECRET === 'your_super_secret_jwt_key_change_this_in_production') {
  finalEnv.JWT_SECRET = jwtSecret;
}

let envFileContent = '# Environment Variables\n';
envFileContent += '# DO NOT COMMIT THIS FILE TO VERSION CONTROL\n\n';

Object.entries(finalEnv).forEach(([key, value]) => {
  envFileContent += `${key}=${value}\n`;
});

fs.writeFileSync(envPath, envFileContent);
console.log('✅ .env file has been created/updated successfully!');
console.log('\nEnvironment variables:');
Object.entries(finalEnv).forEach(([key, value]) => {
  if (key === 'JWT_SECRET') {
    console.log(`  ${key}=${value.substring(0, 20)}... (${value.length} characters)`);
  } else {
    console.log(`  ${key}=${value}`);
  }
});

const exampleEnv = {
  PORT: '5000',
  MONGODB_URI: 'mongodb://localhost:27017/task_management',
  JWT_SECRET: 'your_super_secret_jwt_key_change_this_in_production',
  JWT_EXPIRE: '7d',
  NODE_ENV: 'development'
};

let exampleContent = '# Environment Variables Example\n';
exampleContent += '# Copy this file to .env and update the values\n\n';

Object.entries(exampleEnv).forEach(([key, value]) => {
  exampleContent += `${key}=${value}\n`;
});

fs.writeFileSync(envExamplePath, exampleContent);
console.log('\n✅ .env.example file has been created!');
console.log('\n⚠️  IMPORTANT: Update MONGODB_URI if you\'re using MongoDB Atlas or a different database URL.');
