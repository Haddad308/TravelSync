import { useEffect, useState } from 'react';

export const ImageGallery = ({ images }) => {
    const [loadedImages, setLoadedImages] = useState([]);

    useEffect(() => {
        console.log('images', images);
    }, [images])

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => [...prev, index]);
    };

    return (
        <>
            {images?.length === 0 ? (
                <div className="col-span-12 text-center">No images found</div>
            ) : (
                <div className="grid grid-cols-8 gap-4">

                    <div id="section-1" className="col-span-4 h-[100%] flex items-center justify-center">
                        {images?.length > 0 && (
                            <img
                                className={`rounded-xl h-full w-full object-cover ${loadedImages.includes(0) ? '' : 'hidden'}`}
                                src={images[0].imageUrl}
                                alt=""
                                onLoad={() => handleImageLoad(0)}
                            />
                        )}
                    </div>

                    <div id="section-2" className="col-span-2 flex flex-col gap-5  h-full">
                        {images?.length > 1 && (
                            <img
                                className={`rounded-xl h-full w-full  object-cover ${loadedImages.includes(1) ? '' : 'hidden'}`}
                                src={images[1].imageUrl}
                                alt=""
                                onLoad={() => handleImageLoad(1)}
                            />
                        )}

                        {images?.length > 2 && (
                            <img
                                className={`rounded-xl h-full w-full object-cover ${loadedImages.includes(2) ? '' : 'hidden'}`}
                                src={images[2].imageUrl}
                                alt=""
                                onLoad={() => handleImageLoad(2)}
                            />
                        )}
                    </div>

                    <div id="section-3" className="col-span-2 grid gap-5 h-full">
                        {images?.length > 3 && (
                            <img
                                className={`rounded-xl h-full w-full object-cover ${loadedImages.includes(3) ? '' : 'hidden'}`}
                                src={images[3].imageUrl}
                                alt=""
                                onLoad={() => handleImageLoad(3)}
                            />
                        )}
                        {images?.length > 4 && (
                            <img
                                className={`rounded-xl h-full w-full object-cover ${loadedImages.includes(4) ? '' : 'hidden'}`}
                                src={images[4].imageUrl}
                                alt=""
                                onLoad={() => handleImageLoad(4)}
                            />
                        )}
                    </div>

                </div>
            )}
        </>


    );
};

