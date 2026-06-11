const fs = require('fs');
const path = require('path');

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      findFiles(path.join(dir, file), fileList);
    } else if (file === 'page.tsx') {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = findFiles('./app');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<Hero') && !content.includes('backgroundImage=')) {
    let img = '/images/managed_it_hero.png';
    const folder = file.toLowerCase();
    
    if (folder.includes('security') || folder.includes('firewall') || folder.includes('penetration') || folder.includes('dark-web') || folder.includes('end-point')) {
      img = '/images/cyber_security_hero.png';
    } else if (folder.includes('cloud') || folder.includes('azure') || folder.includes('365') || folder.includes('teams')) {
      img = '/images/cloud_solutions_hero.png';
    } else if (folder.includes('professional') || folder.includes('cio') || folder.includes('consulting') || folder.includes('cabling') || folder.includes('migration') || folder.includes('about') || folder.includes('careers') || folder.includes('partners') || folder.includes('our-story') || folder.includes('case-study') || folder.includes('events') || folder.includes('contact')) {
      img = '/images/professional_services_hero.png';
    } else if (folder.includes('ai-') || folder.includes('copilot')) {
      img = '/images/ai_services_hero.png';
    }
    
    content = content.replace(/(<Hero[\s\S]*?)((\s*)\/>)/, `$1\n        backgroundImage="${img}"$2`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file} with ${img}`);
  }
}
