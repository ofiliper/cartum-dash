'use client'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { singleStoryStore } from '@/store/stories/single-story-store';
import { useStore } from 'zustand';
import Loader from '@/components/shared/Loader';
import "./story-single-style.css"
import { BiChevronLeft } from 'react-icons/bi';

export default function StorySingle({ children }: { children: React.ReactElement }) {

    const singleStory = useStore(singleStoryStore);

    if (singleStory.data.isFetching) return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Loader className='border-blue-400' />
        </div>)

    return (
        <div className="h-screen relative bg-black">

            <a href="/dashboard" className='fixed top-4 left-4 z-[99] bg-white text-[52px] rounded-full'>
                <BiChevronLeft />
            </a>

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-xl"
                style={{
                    backgroundImage: `url(${singleStory.data.image})`,
                    filter: "blur(15px)", // Garante um leve desfoque no fundo
                }}
            />

            {/* Conteúdo acima do blur */}
            <div className="relative z-10 w-[800px] h-screen mx-auto bg-white overflow-y-scroll pb-40">
                <div
                    className="h-[480px] w-full"
                    style={{
                        backgroundImage: `url(${singleStory.data.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="py-10 px-10">
                    <h4 className="text-4xl mb-4 font-extrabold">{singleStory.data.title}</h4>
                    <p className="text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper erat ac tempus dapibus. Fusce non ex venenatis, sollicitudin dolor et, viverra sem. In ac dolor aliquam, volutpat nisl quis, lacinia diam. Praesent nisi enim, volutpat ac nisl sit amet, cursus ultrices enim. Sed elementum velit dui, suscipit ultrices tortor efficitur non. Fusce egestas sem at consectetur posuere. Donec venenatis in neque ac cursus.

                        Maecenas posuere semper posuere. Nam lacinia ante leo, vitae ornare sem bibendum id. Aliquam id erat porttitor, vulputate erat sit amet, pharetra metus. Pellentesque in sapien vel est viverra finibus non vitae arcu. Vestibulum varius maximus augue, quis interdum ipsum pulvinar et. Nulla suscipit molestie libero sit amet tincidunt. Sed in purus et neque posuere accumsan in non tellus. Cras id enim in quam maximus lobortis. Maecenas scelerisque, urna non laoreet commodo, massa augue mattis sem, euismod viverra arcu nunc id tellus. Sed malesuada tortor eu urna auctor, at eleifend mauris iaculis. Phasellus dignissim volutpat ipsum, eu dapibus eros tincidunt eu. Cras at quam at quam vulputate finibus in at enim.
                    </p>
                    {children}
                </div>
            </div>

            {/* Player de áudio fixado na parte inferior */}
            <div className="fixed bottom-0 left-0 w-full z-[99] rounded-t-2xl overflow-hidden shadow-2xl">
                <AudioPlayer
                    autoPlay
                    showJumpControls={false}
                    src={`${singleStory.data.audio}`}
                    onPlay={(e) => console.log("onPlay")}
                />
            </div>
        </div>

    )
}