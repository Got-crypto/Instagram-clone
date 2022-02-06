import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './posts/Post'
export default function Timeline(){
    const {photos} = usePhotos()
    return(
        <div className="container col-span-2">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index)=>
                        <Skeleton key={index} count={4} width={640} height={500} className='mb-5' />
                    )}

                </>
            ) : photos?.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ): (
                <p className='text-center text-2xl animate-bounce'>Follow people to see photos</p>
            )}
        </div>
    )
}