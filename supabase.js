
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ylkworwzibtatswmdebs.supabase.co'

const supabaseKey = 'sb_publishable_e3_lkAQBmH8ntIlL6i0f_w_IRw4ym8I'

const supabase = createClient(supabaseUrl, supabaseKey)

window.supabase = supabase;

console.log('Supabase Connected', supabase)

// async function testDB() {
//   const { data, error } = await supabase
//     .from('projects')
//     .select('*')

//   console.log('DATA:', data)
//   console.log('ERROR:', error)
// }

// testDB()
async function loadProjects() {
  const { data, error } = await window.supabase
    .from('projects')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  const html = data.map(project => `
    <div class="project-card" data-category="${project.category}">
      <div class="project-img">
        <img src="${project.image_url}"
             alt="${project.project_name}"
             style="width:100%;height:100%;object-fit:cover;">
      </div>

      <div class="project-overlay">
        <div class="project-info">
          <h4>${project.project_name}</h4>
          <span>${project.location}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Projects Page
  const fullGrid = document.getElementById('fullProjectsGrid');
  if (fullGrid) {
    fullGrid.innerHTML = html;
  }

  // Home Page
  const homeGrid = document.getElementById('homeProjectsGrid');
  if (homeGrid) {
    homeGrid.innerHTML = html;
  }
}

loadProjects();
