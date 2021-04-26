import { type } from 'node:os';
import { createContext, useState, ReactNode, useContext} from 'react';

type Episode = {
    title: string;
    members: string;
    duration: number;
    url: string;
    thumbnail: string;

};


type PlayerContextData ={
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    play:( episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    playNext:() => void;
    playPrevious:() => void;
    toggleShuffle:() => void;
    clearPlayerstete:() => void;
    isShuffing: boolean;
    hasNext:boolean;
    hasPrevious:boolean;
};

export const PlayerContext = createContext ( {} as PlayerContextData);

type PlayerContextProviderProps ={
    children: ReactNode;
}

export function PlayerContextProvider({children}:PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffing, setIsShuffing] = useState(false);
  
    function play(episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex( 0 );
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function toggleLoop(){
      setIsLooping(! isLooping);
  
    }

    
    function toggleShuffle(){
        setIsShuffing(! isShuffing);
    
      }

    function togglePlay(){
        setIsPlaying(! isPlaying);
    
      }
  
    function setPlayingState( state: boolean){
      setIsPlaying(state);
    }

    function clearPlayerstete(){
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffing || (currentEpisodeIndex + 1) < episodeList.length;

    function playNext(){

        if (isShuffing){

            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

        } else  if(hasNext){

            setCurrentEpisodeIndex(currentEpisodeIndex + 1 );
        }
       
    }

    function playPrevious(){
        if (hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }
  
    return (
      <PlayerContext.Provider 
        value={{episodeList,
            currentEpisodeIndex, 
            play,
            playList,
            playNext,
            playPrevious, 
            isPlaying, 
            togglePlay, 
            setPlayingState,
            hasPrevious,
            hasNext,
            isLooping,
            toggleLoop,
            toggleShuffle,
            clearPlayerstete,
            isShuffing,

            }}>
                    {children}
      </PlayerContext.Provider>
    )
}

export const usePlayer = () =>{
    return useContext(PlayerContext);
}