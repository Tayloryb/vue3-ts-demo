/**
 * 验证器
 */

 const validator = {
  required: {
    required: true,
    message: '此项必填',
  },
  requiredFunc(name = '此项') {
    return {
      required: true,
      message: `${name}必填`,
    };
  },
  rangeDate: {
    type: 'array',
    length: 2,
    required: true,
    message: '此项必填',
  },
  password: {
    type: 'string',
    min: 6,
    max: 20,
    message: '长度为6-20个字符',
  },
  lengthFunc(name = '', min = 2, max = 50) {
    return {
      type: 'string',
      min,
      max,
      message: `${name}长度为${min}-${max}个字符`,
    };
  },
  idCardNoFunc(name = '身份证') {
    return {
      type: 'string',
      message: `${name}格式错误(15,18)位`,
      trigger: 'change',
      validator: (rule, value) => {
        if (String.isEmpty(value)) {
          return true;
        }
        return /(^[1-9][0-9Xx]{14,17}$)/.test(value);
      },
    };
  },
  length: {
    type: 'string',
    min: 2,
    max: 50,
    message: '长度为2-50个字符',
  },
  lengthShort: {
    type: 'string',
    min: 3,
    max: 20,
    message: '长度为3-20个字符',
  },
  lengthName: {
    type: 'string',
    min: 2,
    max: 10,
    message: '长度为2-10个字符',
  },
  lengthMax: {
    type: 'string',
    max: 50,
    message: '长度最大50个字符',
  },
  lengthContent: {
    type: 'string',
    min: 5,
    max: 100,
    message: '长度为5-100个字符',
  },
  intValue: {
    type: 'integer',
    min: 1,
    message: '必须为正整数',
  },
  intValueFunc(name = '', min = 1, max = 100000) {
    return {
      type: 'integer',
      min: min,
      max: max,
      message: `${name}必须为${min}-${max}的整数`,
    };
  },
  email: {
    type: 'email',
    message: '邮箱格式错误',
  },
  date: {
    type: 'date',
    message: '日期格式错误',
  },
  mobile: {
    length: 11,
    message: '手机号格式错误',
    validator: (rule, value) => /^1[0-9]{10}$/.test(value),
  },
};
export default validator;