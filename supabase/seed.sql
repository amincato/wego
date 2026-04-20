-- ============================================================================
-- wego — seed.sql
-- Populates the public.schools catalog. Run after schema.sql.
-- Idempotent: uses ON CONFLICT to upsert rows.
-- ============================================================================

insert into public.schools (
  id, name, city, country, language, orientation, image_url,
  gallery, mobility_months, price_per_month, spots_left,
  description, highlights, testimonials, coordinator
) values
(
  'school_fsg',
  'Friedrich Schiller Gymnasium',
  'Rostock', 'Germany', 'de', 'scientific',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  '[
    {"id":"g_fsg_1","imageUrl":"https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80","caption":"Giulia from France"},
    {"id":"g_fsg_2","imageUrl":"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80","caption":"Lily from Spain"},
    {"id":"g_fsg_3","imageUrl":"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"}
  ]'::jsonb,
  '{3,6,10}', 2500, 15,
  'Founded in 1890, Alexander von Humboldt Gymnasium is one of Berlin''s most prestigious academic institutions. We offer a comprehensive international program with a strong focus on languages and international relations.',
  '{
    "admission":["Report card from the last school year","Letter of motivation (max 500 chars)","Interview with the school coordinator"],
    "schoolSchedule":["Monday – Friday, 8:00 – 15:30","Two-week orientation program in September","After-school clubs available on Tuesdays and Thursdays"],
    "subjectsAndActivities":["German language, literature & culture","Math, Physics, Chemistry","Music, Art, Sports (basketball, volleyball, swimming)"]
  }'::jsonb,
  '[
    {"id":"t_fsg_1","studentName":"Lucas Martinez","year":2026,"origin":"Spain","avatarUrl":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80","rating":5,"text":"My experience was amazing. I made many new friends and I''m still in contact with them. I improved the language and I got the C1 level at Goethe Institut. I''m very proud of my self."},
    {"id":"t_fsg_2","studentName":"Ulrike Werkstoff","year":2026,"origin":"Germany","avatarUrl":"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80","rating":5,"text":"My experience at Schiller Gymnasium was wonderful. Professors and classmates made me feel welcomed from the beginning. I felt fully integrated into the community and quickly at home in a new environment."}
  ]'::jsonb,
  '{"name":"Anna Schmidt","avatarUrl":"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"}'::jsonb
),
(
  'school_thiers',
  'Lycée Thiers',
  'Marseille', 'France', 'fr', 'classic',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
  '[{"id":"g_thiers_1","imageUrl":"https://images.unsplash.com/photo-1491841651911-c44c30c34548?auto=format&fit=crop&w=800&q=80"}]'::jsonb,
  '{3,6}', 2400, 15,
  'Lycée Thiers is one of the oldest and most prestigious high schools in southern France, with a strong tradition in literature, arts and sciences.',
  '{"admission":["Report card from the last two years","Letter of motivation in French (preferred) or English"],"schoolSchedule":["Monday – Friday, 8:30 – 17:00","Wednesday half-day"],"subjectsAndActivities":["French literature, philosophy, history","Mathematics, physics, biology","Theater, debate club"]}'::jsonb,
  '[]'::jsonb,
  '{"name":"Marie Dubois","avatarUrl":"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"}'::jsonb
),
(
  'school_goethe',
  'Goethe Gymnasium',
  'Kempten', 'Germany', 'de', 'linguistic',
  'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
  '[]'::jsonb,
  '{3,6,10}', 2400, 15,
  'A Bavarian high school with a humanistic tradition and a strong international exchange program.',
  '{"admission":["Report card from the last school year","Basic German A2 level required"],"schoolSchedule":["Monday – Friday, 8:00 – 15:00"],"subjectsAndActivities":["German, Latin, English","Music and arts program","Alpine sports club"]}'::jsonb,
  '[]'::jsonb,
  '{"name":"Klaus Weber","avatarUrl":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"}'::jsonb
),
(
  'school_kollwitz',
  'Käthe Kollwitz Gymnasium',
  'Stuttgart', 'Germany', 'de', 'artistic',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  '[]'::jsonb,
  '{3}', 3000, 5,
  'Modern Gymnasium in Stuttgart with a focus on sustainability and the arts.',
  '{"admission":["Portfolio of personal artwork","Letter of motivation"],"schoolSchedule":["Monday – Friday, 8:15 – 16:00"],"subjectsAndActivities":["Art history, painting, sculpture","Drama"]}'::jsonb,
  '[]'::jsonb,
  '{"name":"Lena Bauer","avatarUrl":"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80"}'::jsonb
),
(
  'school_faidherbe',
  'Lycée Faidherbe',
  'Lille', 'France', 'fr', 'scientific',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  '[]'::jsonb,
  '{3,6,10}', 2400, 15,
  'Historic lycée in Lille with a strong focus on scientific preparatory classes.',
  '{"admission":["French level B1 recommended"],"schoolSchedule":["Monday – Friday, 8:00 – 17:30"],"subjectsAndActivities":["Mathematics, physics, chemistry","Debate club"]}'::jsonb,
  '[]'::jsonb,
  '{"name":"Pierre Laurent","avatarUrl":"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"}'::jsonb
),
(
  'school_clemenceau',
  'Lycée Clemenceau',
  'Nantes', 'France', 'fr', 'musical',
  'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80',
  '[]'::jsonb,
  '{3,6,10}', 2300, 15,
  'Large lycée in Nantes known for its multicultural environment and sports programs.',
  '{"admission":["Musical audition optional"],"schoolSchedule":["Monday – Friday, 8:00 – 16:30"],"subjectsAndActivities":["Music conservatory program","Orchestra, choir"]}'::jsonb,
  '[]'::jsonb,
  '{"name":"Jean Moreau","avatarUrl":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}'::jsonb
)
on conflict (id) do update set
  name = excluded.name,
  city = excluded.city,
  country = excluded.country,
  language = excluded.language,
  orientation = excluded.orientation,
  image_url = excluded.image_url,
  gallery = excluded.gallery,
  mobility_months = excluded.mobility_months,
  price_per_month = excluded.price_per_month,
  spots_left = excluded.spots_left,
  description = excluded.description,
  highlights = excluded.highlights,
  testimonials = excluded.testimonials,
  coordinator = excluded.coordinator;
