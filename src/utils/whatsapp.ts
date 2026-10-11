export const YUKTHA_WHATSAPP_NUMBER = '9701369352';
export const YUKTHA_PHONE_DISPLAY = '+91 9701369352';

/**
 * Creates a WhatsApp click-to-chat URL directed to Team Yuktha (9701369352)
 */
export function getYukthaWhatsAppUrl(message?: string): string {
  const cleanNumber = YUKTHA_WHATSAPP_NUMBER.replace(/\D/g, '');
  const internationalNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
  
  const defaultText = "Hello Team Yuktha! I need guidance for my academic project. Please share details.";
  const encodedText = encodeURIComponent(message || defaultText);
  
  return `https://wa.me/${internationalNumber}?text=${encodedText}`;
}

/**
 * Creates a proposal submission alert message for WhatsApp
 */
export function getProposalWhatsAppUrl(refId: string, title: string, studentName: string): string {
  const text = `Hi Team Yuktha! I have just submitted my project proposal on Yuktha Portal.\n\n📌 Ref ID: ${refId}\n👤 Name: ${studentName}\n📚 Project: ${title}\n\nPlease review and share the minimal guidance quote & next steps.`;
  return getYukthaWhatsAppUrl(text);
}

/**
 * Creates a WhatsApp URL for admin to contact a student
 */
export function getStudentWhatsAppUrl(studentPhone: string, studentName: string, projectTitle: string): string {
  let cleanNumber = studentPhone.replace(/\D/g, '');
  if (!cleanNumber.startsWith('91') && cleanNumber.length === 10) {
    cleanNumber = `91${cleanNumber}`;
  }
  const text = `Hi ${studentName}! This is Team Yuktha regarding your project proposal "${projectTitle}". We reviewed your requirements and are ready to provide complete guidance at our student-friendly minimal rates. When is a good time for a quick 5-min call?`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
