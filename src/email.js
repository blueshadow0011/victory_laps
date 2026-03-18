import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const useContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_86qliin', 'template_qyl7zni', form.current, {
      publicKey: '0F5UtXjU6-30sm2HI',
    })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return { form, sendEmail };
};

export default useContactUs;
