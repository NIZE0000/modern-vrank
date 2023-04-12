// channel type
export type channel = {
    channelId: number;
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    country: string;
    statistics: {
      viewCount: number;
      subscriberCount: number;
      hiddenSubscriberCount: boolean;
      videoCount: number;
    };
  };