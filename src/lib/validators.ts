export const validators = {
  // 내용: 1~500자, 첫/끝 공백 불가
  content: (value: string) => {
    const regex = /^(?! )(?!.* $).{1,500}$/s;
    return regex.test(value) || '내용은 1~500자 이내, 시작/끝 공백 없이 입력해주세요.';
  },

  // 저자: 1~50자, 첫/끝 공백 불가
  author: (value: string) => {
    const regex = /^(?! )(?!.* $).{1,50}$/;
    return regex.test(value) || '저자 이름은 1~50자, 시작/끝 공백 없이 입력해주세요.';
  },

  // URL
  url: (value: string) => {
    const regex = /^https?:\/\/[^\s$.?#].[^\s]*$/;
    return regex.test(value) || '올바른 URL 형식이 아닙니다.';
  },

  // 태그: 최대 10자, 첫/끝 공백 불가
  tag: (value: string) => {
    const regex = /^(?! )(?!.* $).{0,10}$/;
    return regex.test(value) || '태그는 최대 10자, 시작/끝 공백 없이 입력 가능합니다.';
  },
};

// 회원가입 유효성 검사
export const signupValidators = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '유효한 이메일 주소를 입력해주세요.',
  },
  password: {
    pattern: /^\S{6,}$/, // 최소 6자, 공백 불가
    message: '비밀번호는 최소 6자 이상 띄어쓰기를 포함할 수 없습니다.',
  },
  nickname: {
    pattern: /^(?! )(?!.* $)[a-zA-Z0-9가-힣]{2,12}$/, // 2~12자, 시작/끝 공백 불가
    message: '닉네임은 2~12자 시작/끝 공백 없이 입력해주세요.',
  },
  passwordConfirmation: {
    validate: (value: string, password: string) =>
      value === password || '비밀번호가 일치하지 않습니다.',
  },
};
