import { useState } from "react";


function CommentSection ( { city , user}) {
    const [comment, setComment ] = useState("");
    const [ comments, setComments ] = useState([]);

    const handleSubmit = () => {
        if(!comment.trim()) return;
        const newComment = {
            user: user.email,
            text: comment,
            date: new Date().toLocaleString("tr-TR"),
        };
        setComments([newComment, ...comments]);
        setComment("");
    };


    if(!user) {
        return <p className="comment-warning">Yorum yapabilmek icin giris yapiniz.</p>;
    }

    return (
        <div className="comment-section">
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

            <ul className="comment-list">
                {comments.map((c, i) => (
                    <li key={i} className="component-item">
                        <strong>{c.user}</strong> ({c.date}): <br /> {c.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentSection;