import { Client } from 'pg';
import { AI_EMPLOYEES, INNOVATIONS_DATA, CAREER_ROLES, PRODUCTS_DATA } from '../src/data/contentData';

async function seed() {
  console.log('Connecting to NEW Supabase database to seed content...');
  const client = new Client({
    host: 'aws-0-ap-northeast-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.wclpchjxdglhinoazxmr',
    password: 'Vtabsquare@123',
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected!');

  // 1. Seed AI EMPLOYEES
  console.log(`Seeding ${AI_EMPLOYEES.length} AI Employees...`);
  for (const emp of AI_EMPLOYEES) {
    await client.query(`
      INSERT INTO public.ai_employees (id, title, role, description, icon, badge, metrics, capabilities, tech_stack)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        role = EXCLUDED.role,
        description = EXCLUDED.description,
        icon = EXCLUDED.icon,
        badge = EXCLUDED.badge,
        metrics = EXCLUDED.metrics,
        capabilities = EXCLUDED.capabilities,
        tech_stack = EXCLUDED.tech_stack;
    `, [
      emp.id,
      emp.title,
      emp.role,
      emp.description,
      typeof emp.icon === 'string' ? emp.icon : 'Bot',
      emp.badge || null,
      JSON.stringify(emp.metrics || []),
      JSON.stringify(emp.capabilities || []),
      JSON.stringify(emp.techStack || [])
    ]);
  }
  console.log('AI Employees seeded!');

  // Ensure columns in innovations are nullable
  await client.query(`
    ALTER TABLE public.innovations ALTER COLUMN category DROP NOT NULL;
    ALTER TABLE public.innovations ALTER COLUMN readiness DROP NOT NULL;
    ALTER TABLE public.innovations ALTER COLUMN status DROP NOT NULL;
  `);

  // 2. Seed INNOVATIONS
  console.log(`Seeding ${INNOVATIONS_DATA.length} Innovations...`);
  for (const inn of INNOVATIONS_DATA) {
    await client.query(`
      INSERT INTO public.innovations (id, title, category, description, status, readiness, metrics, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        status = EXCLUDED.status,
        readiness = EXCLUDED.readiness,
        metrics = EXCLUDED.metrics,
        tags = EXCLUDED.tags;
    `, [
      inn.id,
      inn.title,
      inn.category || 'Enterprise AI',
      inn.description,
      inn.status || 'Active',
      inn.readiness || 'Production',
      inn.metrics || null,
      JSON.stringify(inn.tags || [])
    ]);
  }
  console.log('Innovations seeded!');

  // 3. Seed CAREER ROLES
  console.log(`Seeding ${CAREER_ROLES.length} Career Roles...`);
  for (const role of CAREER_ROLES) {
    await client.query(`
      INSERT INTO public.career_roles (id, title, department, location, type, experience, description, requirements)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        department = EXCLUDED.department,
        location = EXCLUDED.location,
        type = EXCLUDED.type,
        experience = EXCLUDED.experience,
        description = EXCLUDED.description,
        requirements = EXCLUDED.requirements;
    `, [
      role.id,
      role.title,
      role.department,
      role.location,
      role.type,
      role.experience,
      role.description,
      JSON.stringify(role.requirements || [])
    ]);
  }
  console.log('Career Roles seeded!');

  // 4. Seed IOT CONTENT
  console.log('Seeding default IoT content...');
  await client.query(`
    INSERT INTO public.iot_content (
      id, header_badge, header_title, header_highlight, header_description, 
      reference_app_badge, reference_app_title, benefits, capabilities, signals
    )
    VALUES (
      'default-iot',
      'INDUSTRIAL IOT & SMART AUTOMATION',
      'Transform physical devices into intelligent automated pipelines.',
      'AI Edge & Telemetry Operations',
      'Stream live telemetry, monitor environmental health, and trigger predictive maintenance actions in real time.',
      'IOT OPERATIONS SUITE',
      'Autonomous Facility & Equipment Intelligence',
      '["Sub-millisecond sensor ingestion", "Edge-to-cloud automated synchronization", "Zero-trust anomaly detection"]'::jsonb,
      '[]'::jsonb,
      '[]'::jsonb
    )
    ON CONFLICT (id) DO NOTHING;
  `);
  console.log('IoT content seeded!');

  // 5. Seed PRODUCTS
  console.log(`Seeding ${PRODUCTS_DATA.length} Products...`);
  for (const prod of PRODUCTS_DATA) {
    await client.query(`
      INSERT INTO public.products (
        id, title, short_description, full_description, category, subcategory,
        tags, impact_metric, key_features, tech_stack, icon_name, featured,
        image_url, demo_snippet, detail_content
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        short_description = EXCLUDED.short_description,
        full_description = EXCLUDED.full_description,
        category = EXCLUDED.category,
        subcategory = EXCLUDED.subcategory,
        tags = EXCLUDED.tags,
        impact_metric = EXCLUDED.impact_metric,
        key_features = EXCLUDED.key_features,
        tech_stack = EXCLUDED.tech_stack,
        icon_name = EXCLUDED.icon_name,
        featured = EXCLUDED.featured,
        image_url = EXCLUDED.image_url,
        demo_snippet = EXCLUDED.demo_snippet,
        detail_content = EXCLUDED.detail_content;
    `, [
      prod.id,
      prod.title,
      prod.shortDescription || null,
      prod.fullDescription || null,
      prod.category || null,
      (prod as any).subcategory || null,
      JSON.stringify(prod.tags || []),
      prod.impactMetric || null,
      JSON.stringify(prod.keyFeatures || []),
      JSON.stringify(prod.techStack || []),
      prod.iconName || 'Package',
      prod.featured ?? true,
      prod.imageUrl || null,
      prod.demoSnippet ? JSON.stringify(prod.demoSnippet) : null,
      (prod as any).detailContent ? JSON.stringify((prod as any).detailContent) : null
    ]);
  }
  console.log('Products seeded!');

  await client.end();
  console.log('ALL CONTENT SEEDING COMPLETE!');
}

seed().catch(console.error);
