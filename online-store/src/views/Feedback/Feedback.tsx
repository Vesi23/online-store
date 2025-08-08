import { useEffect, useState } from 'react';
// import { database } from '../../config/firebase-config';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase-config';

interface FeedbackData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdOn: number;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const feedbacksRef = ref(db, 'feedbacks');
    
    const unsubscribe = onValue(feedbacksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbacksList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setFeedbacks(feedbacksList);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Feedbacks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {feedbacks.map((feedback) => (
            <div key={feedback.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{feedback.name}</h3>
              <p><strong>Email:</strong> {feedback.email}</p>
              <p><strong>Phone:</strong> {feedback.phone}</p>
              <p><strong>Message:</strong> {feedback.message}</p>
              <p><strong>Status:</strong> {feedback.status}</p>
              <p><strong>Created:</strong> {new Date(feedback.createdOn).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;