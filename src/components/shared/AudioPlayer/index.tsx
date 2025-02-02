import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const AudioPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.8);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;

        const updateProgress = () => {
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };

        audio.addEventListener("timeupdate", updateProgress);
        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
        };
    }, [volume]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = (parseFloat(e.target.value) / 100) * (audioRef.current?.duration || 0);
        if (audioRef.current) audioRef.current.currentTime = newTime;
        setProgress(parseFloat(e.target.value));
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
    };

    return (
        <div className="w-full max-w-md bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-bold">Música Atual</h2>
            <p className="text-sm text-gray-400">Artista Exemplo</p>
            <div className="w-full flex items-center justify-center gap-4 mt-4">
                <button
                    onClick={togglePlayPause}
                    className="bg-green-500 p-3 rounded-full hover:bg-green-600 transition"
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>
            <input
                type="range"
                value={progress}
                onChange={handleProgressChange}
                className="w-full mt-2"
            />
            <div className="flex items-center gap-2 mt-2">
                <Volume2 size={20} />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24"
                />
            </div>
            <audio ref={audioRef} src={`${process.env.NEXT_PUBLIC_API_URL}/upload/adf8adb6-65ad-4390-9770-84310450ceb9/1738288586658.mp3`} />
        </div>
    );
};

export default AudioPlayer;
