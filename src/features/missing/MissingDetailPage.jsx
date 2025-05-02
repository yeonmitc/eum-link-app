import React,{useState, useEffect} from 'react'
import './MissingDetailPage.css'
import { useParams } from "react-router-dom"

import { Grid ,Box, Card ,InputBase} from '@mui/material';
import { EllipsisVertical ,MapPin ,Mars,Venus ,UserRoundSearch,HeartHandshake } from 'lucide-react';

import PostComment from '@/common/components/PostComment';
import PostMap from '@/common/components/PostMap';
import { useMissingPets } from '@/hooks/useMissingPets';
import { usePetSpecies } from '@/hooks/usePetSpecies';

const MissingDetailPage = () => {
  const { id } = useParams();
  // console.log("pm id :",id);

  const { data, isLoading } = useMissingPets();
  const { data: species } = usePetSpecies();

  // console.log("species",species );

  if (isLoading) {
    return <div>Loading...</div>; 
  }
  if (!data[id] || data[id].length === 0) {
    return <div>Not Found</div>;
  }
  const pet = data[id];

  // const matchedSpecies = species.find(s => s.id === pet.refSpecies);
  const matchedSubSpecies = species.find(s => s.id === pet.subSpecies); 

  return (
    <Grid  container spacing={0} sx={{padding:'0 4%', fontFamily:'Gmarket_light'}}>
      <Grid size={12} sx={{ width:'100%', display:'flex' ,color:"#fff" ,fontFamily: 'KBO_medium'}}>
        <Box id='postnav' sx={{background:' #436850'}} >실종 신고</Box>
        <Box id='postnav' sx={{background:' #5D9471'}}>
          {pet?.petName} {pet?.isMissing === true? ( <UserRoundSearch  strokeWidth={2} />) 
          : ( <HeartHandshake  strokeWidth={2}/>) } </Box>
      </Grid>

      <Grid container size={12} >
        <Box id='post' sx={{width:'92vw',height: '76vh',textAlign:'center',borderRadius:'0 20px 20px 20px', padding: '4vh 5vw'}}>
      <EllipsisVertical id='postmenu'/>
          {/* 정보카드 */}
          <Grid size={12}  sx={{width:'82vw',height: '37vh', display:'flex'}} >
              {/* 사진 */}
              <Grid size={4}>
                <Card sx={{ maxWidth: '24vw' ,height: '34vh',borderRadius:'20px'}}>
                  <img src={pet?.imageUrl}/>
                </Card>
              </Grid>
              {/* 정보상세 */}
              <Grid size={4} id='d-text' container  spacing={0} sx={{ maxWidth: '30vw' ,maxHeight: '34vh'}} >
                <Grid container size={12} >
                  <h2>{pet?.petName} </h2> 
                  {pet?.isMissing === true 
                  ? "(실종됨)" : "(발견됨)"} 
                  <h3 style={{ marginLeft: 'auto'}}>{pet?.lostDate}</h3>
                  </Grid>
                <Grid container size={12} >
                  <h3>종</h3>   {matchedSubSpecies?.name}</Grid>
                <Grid container size={12}>
                  <h3>성별</h3> {pet?.petGender === "m" 
                  ? ( <div id='jender'><Mars strokeWidth={2} color='blue'/> <Venus strokeWidth={2.75} color='gray'/></div>)
                  : ( <div id='jender'><Mars strokeWidth={2} color='gray'/> <Venus strokeWidth={2.75} color='red'/></div>)}
                  {pet?.petGender === true ? "(중성화)" : "" }
                </Grid>
                <Grid container size={12}>
                  <h3>나이</h3> {pet?.age}살</Grid>
                <Grid container size={12}>
                  <h3>특징</h3> {pet?.description}</Grid>
              </Grid>
              {/* 지도 */}
              <Grid size={4}>
                  <Card sx={{ width: '27vw' ,height: '34vh', background:' #fff',borderRadius:'20px',boxShadow:'3px 3px 3px rgb(177, 177, 177)'}}>
                    <PostMap lostLocation={pet?.lostLocation || {}}/>
                    <Box id='loc' sx={{display:'flex', alignItems:'center',mt:1,marginLeft:'10px'}}>
                      <MapPin  strokeWidth={2.75} color='#436850'  />
                      <h3 >실종 당시 위치 </h3>{pet?.lostLocation.number_address}
                      </Box>
                  </Card>
              </Grid>
          </Grid>
          {/* 댓글 */}
          <Grid size={12}  sx={{width:'82vw',height: '32vh', background:' #fff',borderRadius:'20px',}}>
            <PostComment comments={pet.comments || {}}/>
          </Grid>

        </Box>
      </Grid>
{/* 하단 버튼 */}
      <Grid size={12}sx={{ marginTop:'1vh', display:'flex' ,color:"#fff"}}>
        <Box sx={{width:'92vw',height: '4vh',background:' #436850',textAlign:'center' , lineHeight:'6vh',borderRadius:'20px'}}>
          
        </Box>
      </Grid>
    </Grid> 
  )
}

export default MissingDetailPage
