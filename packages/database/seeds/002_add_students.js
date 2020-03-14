const EMAIL_DOMAIN = 'schoolofrock.com';
const STATUS_SUSPENDED = 'suspended';

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('student')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('student').insert([
        { id: 1, first_name: 'Johnny', last_name: 'Blaze', email: `j.blaze@${EMAIL_DOMAIN}` },
        { id: 2, first_name: 'Sam', last_name: 'Lee', email: `s.lee@${EMAIL_DOMAIN}` },
        {
          id: 3,
          first_name: 'Sauron',
          last_name: 'Dark Lord',
          email: `sauron@${EMAIL_DOMAIN}`,
          status: STATUS_SUSPENDED,
        },
        { id: 4, first_name: 'Shanti', last_name: 'Pereira', email: `s.pereira@${EMAIL_DOMAIN}` },
        { id: 5, first_name: 'Xing Hong', last_name: 'Wong', email: `xh.wong@${EMAIL_DOMAIN}` },
        { id: 6, first_name: 'Frodo', last_name: 'Baggins', email: `frodo@${EMAIL_DOMAIN}` },
        { id: 7, first_name: 'Nur Haziq', last_name: 'Sulaiman', email: `n.haziq@${EMAIL_DOMAIN}` },
        { id: 8, first_name: 'Sofia', last_name: 'Ahmad', email: `sofia@${EMAIL_DOMAIN}` },
        { id: 9, first_name: 'Nurul Afiqah', last_name: 'Imran', email: `afiqah@${EMAIL_DOMAIN}` },
        {
          id: 10,
          first_name: 'Jim',
          last_name: 'Moriarty',
          email: `j.moriarty@${EMAIL_DOMAIN}`,
          status: STATUS_SUSPENDED,
        },
        { id: 11, first_name: 'Haresh', last_name: 'Anand', email: `haresh@${EMAIL_DOMAIN}` },
        { id: 12, first_name: 'Harry', last_name: 'Foo', email: `harry.f@${EMAIL_DOMAIN}` },
        { id: 13, first_name: 'Guoshen', last_name: 'Li', email: `gs.li@${EMAIL_DOMAIN}` },
        { id: 14, first_name: 'Zheng Xing', last_name: 'Li', email: `zx.li@${EMAIL_DOMAIN}` },
        { id: 15, first_name: 'Harris', last_name: 'Irfan', email: `harris@${EMAIL_DOMAIN}` },
        {
          id: 16,
          first_name: 'Leslie',
          last_name: 'Peterson',
          email: `l.peterson@${EMAIL_DOMAIN}`,
        },
        { id: 17, first_name: 'Mark', last_name: 'Young', email: `m.young@${EMAIL_DOMAIN}` },
        { id: 18, first_name: 'Patrick', last_name: 'Zhou', email: `patrick.z@${EMAIL_DOMAIN}` },
        { id: 19, first_name: 'Ning', last_name: 'Cai', email: `cai_ning@${EMAIL_DOMAIN}` },
        { id: 20, first_name: 'De Lun', last_name: 'Wang', email: `dl.wang@${EMAIL_DOMAIN}` },
        { id: 21, first_name: 'Amir', last_name: 'Azim', email: `amir@${EMAIL_DOMAIN}` },
        { id: 22, first_name: 'Izzat', last_name: 'Jaffar', email: `izzat@${EMAIL_DOMAIN}` },
        { id: 23, first_name: 'Syafiq', last_name: 'Yusof', email: `syafiq@${EMAIL_DOMAIN}` },
        { id: 24, first_name: 'Hakim', last_name: 'Amin', email: `hakim@${EMAIL_DOMAIN}` },
        { id: 25, first_name: 'Shilpa', last_name: 'Gupta', email: `shilpa@${EMAIL_DOMAIN}` },
        {
          id: 26,
          first_name: 'Peter',
          last_name: 'Quill',
          email: `p.quill@${EMAIL_DOMAIN}`,
          status: STATUS_SUSPENDED,
        },
      ]);
    });
};
