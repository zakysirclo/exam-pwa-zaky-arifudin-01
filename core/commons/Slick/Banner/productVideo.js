const generateVideo = (props) => {
    const { urlEmbed, videoUrl, video } = props;

    if (urlEmbed || video) {
        const urlVideoTag = video ? video.split('"') : null;
        return (
            <div className="bg-[#eee] w-full relative pt-[116%] mt-0 sm:h-auto sm:pt-0 sm:flex sm:justify-center sm:bg-white">
                <iframe
                    width="100%"
                    height="600"
                    src={urlEmbed || urlVideoTag[5]}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={urlVideoTag ? urlVideoTag[8] : ''}
                    className="absolute top-0 h-full sm:h-[600px]"
                />
            </div>
        );
    }
    if (videoUrl) {
        const urlVideo = videoUrl && videoUrl.video_url.split('/');

        return (
            <div className="bg-[#eee] w-full relative pt-[116%] mt-0 sm:h-auto sm:pt-0 sm:flex sm:justify-center sm:bg-white">
                <iframe
                    width="100%"
                    height="600"
                    src={`https://www.youtube.com/embed/${urlVideo[3]}`}
                    title={videoUrl.video_title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 h-full sm:h-[600px]"
                />
            </div>
        );
    }
    return null;
};

export default generateVideo;
