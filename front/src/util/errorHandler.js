export const errorHandler = (error) => {
  switch (error) {
    case 'EmptyErr':
      return '값을 입력해주세요.';
    case 'EmailFormErr':
      return '이메일 형식으로 입력해주세요.';
    case 'PhoneFormErr':
      return '번호 형식이 유효하지 않습니다.';
    default:
      return '';
  }
};
