import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import './App.css'

function App() {
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

  return (
    <div className="vl-app">
      <header className="vl-header">
        <h1>Victory Laps</h1>
      </header>
      <main className="vl-main">
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
                <progress value={progressData?.progress || 0} max={100}></progress>
                <h3>{progressData?.progress ?? 0}KM with goal 100KM</h3>
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
              {[...pastCauses].reverse().map((cause, idx) => (
                <li key={idx}>
                  <strong>{cause.Title}</strong> <span>({cause.Date})</span>
                </li>
              ))}
            </ul>
          )}
        </section>


      </main>

      <footer className="vl-footer">
        <small>&copy; {new Date().getFullYear()} Victory Laps Charity. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default App;
