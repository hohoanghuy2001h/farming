import { send, EmailJSResponseStatus } from '@emailjs/react-native';

const sendEmail = async (title: string, field_name: string, created_at: string, message: string, sub_message: string) => {
    try {
        await send(
            'service_kh5xlis',
            'template_bxf2468',
            {
                title, 
                field_name,
                created_at,
                message,
                sub_message,
            },
            {
              publicKey: 'GckcwRAxLdr0HeMCI',
            },
          );
    
          console.log('SUCCESS!');
    } catch(err) {
        if (err instanceof EmailJSResponseStatus) {
            console.log('EmailJS Request Failed...', err);
          }
    
          console.log('ERROR', err);
    }
};
export default sendEmail;