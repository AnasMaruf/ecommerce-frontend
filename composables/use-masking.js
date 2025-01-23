export function useMasking() {
  const maskEmail = (email) => {
    if (!email) return "";

    const [username, domain] = email.split("@"); //irsyaad@maskemail.com => ['irsyaad', 'maskemail.com']
    const [domainName, domainExt] = domain.split("."); // maskemail.com => ['maskemail', 'com']

    // Mask username with first 2 chars visible
    const maskedUsername =
      username.slice(0, 2) + "*".repeat(username.length - 2);

    // Mask domain name with first char visible
    const maskedDomainName =
      domainName.slice(0, 1) + "*".repeat(domainName.length - 1);

    // Mask domain extension with first char visible
    const maskedDomainExt =
      domainExt.slice(0, 1) + "*".repeat(domainExt.length - 1);

    return `${maskedUsername}@${maskedDomainName}.${maskedDomainExt}`;
  };

  // Fungsi umum untuk masking text
  const maskText = (text, visibleStart = 2, visibleEnd = 1) => {
    if (!text) return "";

    const length = text.length;
    const maskedLength = length - (visibleStart + visibleEnd);

    if (maskedLength <= 0) return text;

    const start = text.slice(0, visibleStart);
    const middle = "*".repeat(maskedLength);
    const end = text.slice(length - visibleEnd);

    return start + middle + end;
  };

  // Masking nomor telepon
  const maskPhone = (phone) => {
    if (!phone) return "";
    return phone.slice(0, 4) + "*".repeat(phone.length - 6) + phone.slice(-2);
  };

  return {
    maskEmail,
    maskText,
    maskPhone,
  };
}
