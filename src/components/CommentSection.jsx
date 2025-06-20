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
        <div className="comment-section bg-white bg-opacity-70 backdrop-blur rounded-xl p-4 mt-4 shadow max-w-md w-full">
            <textarea
                className="comment-input w-full p-2 border rounded"
                placeholder={`${city} için yorumunuzu yazın...`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
            />
            <button
                className="comment-button mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                onClick={handleSubmit}
            >
                Gonder
            </button>

            <ul className="comment-list mt-4 space-y-2">
                {comments.map((c, i) => (
                    <li key={i} className="comment-item p-3 rounded-lg bg-white shadow">
                        <strong>{c.user}</strong> ({c.date}): <br /> {c.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentSection;