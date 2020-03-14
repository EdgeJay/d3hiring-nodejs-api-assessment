const EMAIL_DOMAIN = 'schoolofrock.com';
const STATUS_SUSPENDED = 'suspended';

const teachers = [
  {
    first_name: 'John',
    last_name: 'Smith',
    email: `j.smith@${EMAIL_DOMAIN}`,
    students: [0, 1, 2, 4, 13],
  },
  { first_name: 'Jane', last_name: 'Doe', email: `j.doe@${EMAIL_DOMAIN}`, students: [1, 2] },
  {
    first_name: 'Winston',
    last_name: 'Scientist',
    email: `de_scientist@${EMAIL_DOMAIN}`,
    students: [0, 11, 12, 14, 16, 20, 25],
  },
  {
    first_name: 'Pharah',
    last_name: 'Rocketeer',
    email: `justice_rains_from_above@${EMAIL_DOMAIN}`,
    students: [7, 9, 19, 21, 23, 25],
  },
  {
    first_name: 'Tracer',
    last_name: 'Speedster',
    email: `t.racer@${EMAIL_DOMAIN}`,
    students: [2, 4, 7, 10, 22],
  },
  {
    first_name: 'Dennis',
    last_name: 'Goh',
    email: `d.goh@${EMAIL_DOMAIN}`,
    students: [2, 6, 7, 10, 22],
  },
  {
    first_name: 'James',
    last_name: 'Tan',
    email: `j.tan@${EMAIL_DOMAIN}`,
    students: [1, 6, 11, 24],
  },
  {
    first_name: 'Shu Hui',
    last_name: 'Chen',
    email: `sh.chen@${EMAIL_DOMAIN}`,
    students: [17, 18, 22, 24],
  },
  {
    first_name: 'Abdul Rahim',
    last_name: 'Abdullah',
    email: `a.rahim@${EMAIL_DOMAIN}`,
    students: [3, 15, 17, 18],
  },
  {
    first_name: 'Anish',
    last_name: 'Gupta',
    email: `a.gupta@${EMAIL_DOMAIN}`,
    students: [4, 5, 8],
  },
];

const students = [
  { first_name: 'Johnny', last_name: 'Blaze', email: `j.blaze@${EMAIL_DOMAIN}` },
  { first_name: 'Sam', last_name: 'Lee', email: `s.lee@${EMAIL_DOMAIN}` },
  {
    first_name: 'Sauron',
    last_name: 'Dark Lord',
    email: `sauron@${EMAIL_DOMAIN}`,
    status: STATUS_SUSPENDED,
  },
  { first_name: 'Shanti', last_name: 'Pereira', email: `s.pereira@${EMAIL_DOMAIN}` },
  { first_name: 'Xing Hong', last_name: 'Wong', email: `xh.wong@${EMAIL_DOMAIN}` },
  { first_name: 'Frodo', last_name: 'Baggins', email: `frodo@${EMAIL_DOMAIN}` },
  { first_name: 'Nur Haziq', last_name: 'Sulaiman', email: `n.haziq@${EMAIL_DOMAIN}` },
  { first_name: 'Sofia', last_name: 'Ahmad', email: `sofia@${EMAIL_DOMAIN}` },
  { first_name: 'Nurul Afiqah', last_name: 'Imran', email: `afiqah@${EMAIL_DOMAIN}` },
  {
    first_name: 'Jim',
    last_name: 'Moriarty',
    email: `j.moriarty@${EMAIL_DOMAIN}`,
    status: STATUS_SUSPENDED,
  },
  { first_name: 'Haresh', last_name: 'Anand', email: `haresh@${EMAIL_DOMAIN}` },
  { first_name: 'Harry', last_name: 'Foo', email: `harry.f@${EMAIL_DOMAIN}` },
  { first_name: 'Guoshen', last_name: 'Li', email: `gs.li@${EMAIL_DOMAIN}` },
  { first_name: 'Zheng Xing', last_name: 'Li', email: `zx.li@${EMAIL_DOMAIN}` },
  { first_name: 'Harris', last_name: 'Irfan', email: `harris@${EMAIL_DOMAIN}` },
  {
    first_name: 'Leslie',
    last_name: 'Peterson',
    email: `l.peterson@${EMAIL_DOMAIN}`,
  },
  { first_name: 'Mark', last_name: 'Young', email: `m.young@${EMAIL_DOMAIN}` },
  { first_name: 'Patrick', last_name: 'Zhou', email: `patrick.z@${EMAIL_DOMAIN}` },
  { first_name: 'Ning', last_name: 'Cai', email: `cai_ning@${EMAIL_DOMAIN}` },
  { first_name: 'De Lun', last_name: 'Wang', email: `dl.wang@${EMAIL_DOMAIN}` },
  { first_name: 'Amir', last_name: 'Azim', email: `amir@${EMAIL_DOMAIN}` },
  { first_name: 'Izzat', last_name: 'Jaffar', email: `izzat@${EMAIL_DOMAIN}` },
  { first_name: 'Syafiq', last_name: 'Yusof', email: `syafiq@${EMAIL_DOMAIN}` },
  { first_name: 'Hakim', last_name: 'Amin', email: `hakim@${EMAIL_DOMAIN}` },
  { first_name: 'Shilpa', last_name: 'Gupta', email: `shilpa@${EMAIL_DOMAIN}` },
  {
    first_name: 'Peter',
    last_name: 'Quill',
    email: `p.quill@${EMAIL_DOMAIN}`,
    status: STATUS_SUSPENDED,
  },
];

const getMapping = () => {
  return teachers.reduce((acc, val) => {
    val.students.forEach(index => acc.push([val.email, students[index].email]));
    return acc;
  }, []);
};

module.exports = {
  teachers,
  students,
  getMapping,
};
