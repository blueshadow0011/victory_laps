import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase.js'
import './App.css'
import { LinearProgress } from '@mui/material'
import AnimatedContent from './AnimatedContent.jsx'
function Home() {
  const [currentCause, setCurrentCause] = useState({
    title: 'Loading cause...',
    description: '',
    progress: 0,
  });
  const [loading, setLoading] = useState(true);

  const [progressData, setProgressData] = useState(null);
  const [progressLoading, setProgressLoading] = useState(true);

  const [pastCauses, setPastCauses] = useState([]);
  const [pastLoading, setPastLoading] = useState(true);

  // Listen for current cause updates (from Firestore)
  useEffect(() => {
    const causeRef = doc(db, 'cause', 'current');
    const unsubscribe = onSnapshot(
      causeRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentCause({
            title: data.Title || 'Untitled Cause',
            description: data.Description || 'No description available.',
            progress: data.progress || 0,
          });
        } else {
          setCurrentCause({
            title: 'No active cause found',
            description: 'Please check Firestore for the current cause document.',
            progress: 0,
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('🔥 Error listening to current cause:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen for progress updates
  useEffect(() => {
    const progressRef = doc(db, 'progress', 'current');
    const unsubscribe = onSnapshot(
      progressRef,
      (snap) => {
        if (snap.exists()) {
          setProgressData(snap.data());
        } else {
          setProgressData(null);
        }
        setProgressLoading(false);
      },
      (error) => {
        console.error('🔥 Error listening to progress document:', error);
        setProgressLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ✅ Fetch the three previous causes: prev0, prev1, prev2
  useEffect(() => {
    setPastLoading(true);

    const unsubscribes = [];
    const tempCauses = [];

    ['prev0', 'prev1', 'prev2'].forEach((docName, index) => {
      const ref = doc(db, 'cause', docName);

      const unsub = onSnapshot(
        ref,
        (snap) => {
          if (snap.exists()) {
            tempCauses[index] = snap.data();
          } else {
            tempCauses[index] = { title: `Missing: ${docName}`, Date: 'Unknown' };
          }

          // Once all 3 are loaded, update state
          if (tempCauses.filter(Boolean).length === 3) {
            setPastCauses([...tempCauses]);
            setPastLoading(false);
          }
        },
        (error) => {
          console.error(`🔥 Error loading ${docName}:`, error);
          setPastLoading(false);
        }
      );

      unsubscribes.push(unsub);
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, []);
  let desc = "out of";
  let Progress1 = progressData?.progress || 0;
  const Progress = progressData?.progress || 0;
  const Total1 = progressData?.total || 100;
  if (Progress1 > Total1) {
      Progress1 =  Progress1-Total1;
      desc = "over";
    }
  useEffect(() => {
    const color = Progress > Total1 ? '#9a2404' : '#0064b4';
    const color1 = Progress > Total1 ? '#0064b4' : '#ffff';
    document.documentElement.style.setProperty('--progress-color', color);
    document.documentElement.style.setProperty('--progress-background', color1);
    
  }, [Progress, Total1]);
  
  const progressPercentage = Math.min(Math.max((Progress1 / Total1) * 100, 0), 100);
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
        <section className="vl-mission">
          <h2>Our Mission</h2>
          <p>
            Victory Laps is a charity dedicated to raising awareness for a different important cause every month. 
            Join us in making a difference, one lap at a time!
          </p>
        </section>

        {/* ✅ Current cause from Firestore */}
        <section id="current-cause" className="vl-current-cause">
          <h2>
            {loading ? 'Loading current cause...' : `Current Cause: ${currentCause.title}`}
          </h2>
          <p>{currentCause.description}</p>

          <div className="vl-progress-container">
            {progressLoading ? (
              <p>Loading progress...</p>
            ) : (
              <>
                {/* <progress value={Progress1} max={Total1} ></progress> */}
                <LinearProgress variant="determinate" value={progressPercentage} color='primary' /> 
                <h3>{Progress1 ?? 0}KM {desc} {progressData?.total ?? 100}KM</h3>
              </>
            )}
          </div>
        </section>

        {/* ✅ Past causes from Firestore */}
        <section id="past-causes" className="vl-past-causes">
          <h2>Past Causes</h2>
          {pastLoading ? (
            <p>Loading past causes...</p>
          ) : (
            <ul>
              {[...pastCauses].map((cause, idx) => (
                <li key={idx}>
                  <strong>{cause.Title}</strong> <span>({cause.Date})</span>
                </li>
              ))}
            </ul>
          )}
        </section>

          </AnimatedContent>
      </main>

      <footer className="vl-footer">
        <small>&copy; {new Date().getFullYear()} Victory Laps Charity. All rights reserved.</small>
      </footer>
      
    </div>
  )
}

export default Home;
