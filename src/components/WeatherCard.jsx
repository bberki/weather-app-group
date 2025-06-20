import CommentSection from "./CommentSection";

function WeatherCard( { data, onDelete, user, onLoginRequest }) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.icon_code}@2x.png`;


    return (
        <div className="weather-card">
            <h2 className="weather-location">{data.location_name}</h2>
            <img src={iconUrl} alt="Weather icon" className='weather-icon' />
            <p className="weather-description">{data.weather_description}</p>
            <p><strong>Sicaklik:</strong> {data.temperature} °C</p>
            <p><strong>Nem:</strong> {data.humidity} %</p>
            <p><strong>Ruzgar:</strong> {data.wind_speed} m/s ({data.wind_direction}°)</p>
            <p><strong>Basinc:</strong> {data.pressure} hPa</p>
            <p><strong>Enlem:</strong> {data.latitude}, {data.longitude}</p>
            <p><strong>Tarih:</strong> {new Date(data.datetime).toLocaleString("tr-TR")}</p>

            <button className='delete-btn' onClick={() => onDelete(data.id)}>
                🗑 Sil
            </button>

            {user ? (
                <>
                    <div className="expert-opinions">
                        <h3>Uzman Görüşleri</h3>
                        <ul>
                            {(data.expertOpinions || []).map((op, i) => (
                                <li key={i}>{op}</li>
                            ))}
                        </ul>
                    </div>
                    <CommentSection city={data.location_name} user={user} />
                </>
            ) : (
                <button className="login-btn" onClick={onLoginRequest}>Giriş Yap</button>
            )}
        </div>
    );
}

export default WeatherCard;