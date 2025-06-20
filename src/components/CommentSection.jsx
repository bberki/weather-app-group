import { useState, useEffect } from "react";


function CommentSection ({ city, user }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/api/comments/${city}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (err) {
                console.error(err);
            }
        }
        load();
    }, [city]);

    const handleSubmit = async () => {
        if (!comment.trim()) return;

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ city, text: comment }),
            });
            if (res.ok) {
                const saved = await res.json();
                setComments([saved, ...comments]);
                setComment('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="comment-section">
            {user ? (
                <>
                    <textarea
                        className="comment-input"
                        placeholder={`${city} için yorumunuzu yazın...`}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={2}
                    />
                    <button className="comment-button" onClick={handleSubmit}>
                        Gonder
                    </button>
                </>
            ) : (
                <p className="comment-warning">
                    Yorum yapabilmek icin giris yapiniz.
                </p>
            )}

            <ul className="comment-list">
                {comments.map((c, i) => (
                    <li key={i} className="comment-item">
                        <strong>{c.user}</strong> ({c.date}): <br /> {c.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentSection;