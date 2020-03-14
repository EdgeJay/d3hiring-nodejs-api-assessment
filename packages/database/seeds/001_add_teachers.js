const EMAIL_DOMAIN = 'schoolofrock.com';

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('teacher')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('teacher').insert([
        { id: 1, first_name: 'John', last_name: 'Smith', email: `j.smith@${EMAIL_DOMAIN}` },
        { id: 2, first_name: 'Jane', last_name: 'Doe', email: `j.doe@${EMAIL_DOMAIN}` },
        {
          id: 3,
          first_name: 'Winston',
          last_name: 'Scientist',
          email: `de_scientist@${EMAIL_DOMAIN}`,
        },
        {
          id: 4,
          first_name: 'Pharah',
          last_name: 'Rocketeer',
          email: `justice_rains_from_above@${EMAIL_DOMAIN}`,
        },
        { id: 5, first_name: 'Tracer', last_name: 'Speedster', email: `t.racer@${EMAIL_DOMAIN}` },
        { id: 6, first_name: 'Dennis', last_name: 'Goh', email: `d.goh@${EMAIL_DOMAIN}` },
        { id: 7, first_name: 'James', last_name: 'Tan', email: `j.tan@${EMAIL_DOMAIN}` },
        { id: 8, first_name: 'Shu Hui', last_name: 'Chen', email: `sh.chen@${EMAIL_DOMAIN}` },
        {
          id: 9,
          first_name: 'Abdul Rahim',
          last_name: 'Abdullah',
          email: `a.rahim@${EMAIL_DOMAIN}`,
        },
        { id: 10, first_name: 'Anish', last_name: 'Gupta', email: `a.gupta@${EMAIL_DOMAIN}` },
      ]);
    });
};
