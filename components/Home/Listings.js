
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useMarketplace } from '@thirdweb-dev/react'
import NFTCard from './NFTCard'

const style = {
  wrapper: `mx-auto grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24 md:grid-cols-2 md:pt-0 lg:grid-cols-4`
}

const Listings = () => {
  const [listings,setListings] = useState([])
  const marketplace = useMarketplace("0x1C7535b368d13800f87c8833De835538966A1309")



  useEffect(()=> {
    getListings()
  }, [])
  
  const getListings = async () => {
    try {
      const list = await marketplace.getActiveListings()

      setListings(list)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className = {style.wrapper}>
      {listings.length > 0 ? (
      <>
        {listings?.map((listing,index)=> (
        <Link
         key = {index}
         href = {`/assets/${listing.assetContractAddress}/${listing.id}`}
        >
          <a>
            <NFTCard listing = {listing}/>
          </a>
        </Link>

        ))}
      </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Listings