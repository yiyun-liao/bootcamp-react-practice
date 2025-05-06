export function validateEmail(email:string):string{
    if(email.trim() === '') return '帳號不得空白';
    if(!email.includes('@')) return '帳號格式不正確';
    return '';
}

export function validatePassword(password: string): string {
    if (password.trim() === '') return '密碼不得空白';
    if (password.length < 6) return '密碼不得少於六個字元';
    return '';
}
  
export function signInCheck(email: string, password: string): boolean {
    return email === 'test@example.com' && password === '123456';
}

export function signUpCheck(email: string, password: string): boolean {
    return email === 'test@example.com' && password === '123456';
}