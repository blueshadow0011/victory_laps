import './App.css'
import useContactUs from './email.js'
import AnimatedContent from './AnimatedContent.jsx'

export default function Contact() {
  const {form,sendEmail} = useContactUs();
  return (
    <div className="vl-app">
      <main className="vl-main">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
        
        </AnimatedContent>
        <div className='form'>
        <form ref={form} onSubmit={sendEmail}>
          <p>Contact Us</p>
          <label>Title</label>
          <input type="text" name="title" required />
          <label>Name</label>
          <input type="text" name="name" required />
          <label>Email</label>
          <input type="email" name="email" required />
          <label>Message</label>
          <textarea name="message" required />
          <input type="submit" value="Send" />
          
        </form>
        </div>
      </main>

      <footer className="vl-footer">
        <small> {new Date().getFullYear()} Victory Laps Charity. All rights reserved.</small>
      </footer>
    </div>
  )
}