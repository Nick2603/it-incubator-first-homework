import { IVideo, Resolutions } from "../types/IVideo";

export let videos: IVideo[] = [];

export const videosRepository = {
  deleteAllVideos(): void {
    videos.length = 0;
  },

  getVideos(title?: string): IVideo[] {
    if (title) {
      return videos.filter(v => v.title.indexOf(title) > -1);
    };
    return videos;
  },

  getVideoById(id: string): IVideo | null {
    const video = videos.find(v => v.id === +id);
    if (video) {
      return video;
    } else {
      return null;
    };
  },

  createVideo(title: string, author: string, availableResolutions: Resolutions[] = []): IVideo {
    const today = new Date();
    const tomorrow = new Date().setDate(today.getDate() + 1);
    const newVideo: IVideo = {
      id: +Date.now().toString(),
      title,
      author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: today.toISOString(),
      publicationDate: new Date(tomorrow).toISOString(),
      availableResolutions,
    };
    videos.unshift(newVideo);
    return newVideo;
  },

  updateVideo(id: string, title: string, author: string, availableResolutions: Resolutions[] = [], canBeDownloaded = false, minAgeRestriction = null, publicationDate: string): IVideo | null {
    const video = videos.find(v => v.id === +id);
    if (video) {
      video.title = title;
      video.author = author;
      video.availableResolutions = availableResolutions;
      video.canBeDownloaded = canBeDownloaded;
      video.minAgeRestriction = minAgeRestriction;
      video.publicationDate = publicationDate;
      return video;
    } else {
      return null;
    };
  },

  deleteVideo(id: string): string | null {
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].id === +id) {
        videos.splice(i, 1);
        return "deleted";
      };
    };
    return null;
  },
};
