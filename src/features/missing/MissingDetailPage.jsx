import React,{useState, useEffect} from 'react'
import './MissingDetailPage.css'
import { useParams, useNavigate } from "react-router-dom"

import { Grid ,Box, Card ,InputBase} from '@mui/material';
import { EllipsisVertical ,MapPin ,Mars,Venus ,UserRoundSearch,HeartHandshake } from 'lucide-react';

import PostComment from '@/common/components/PostComment';
import PostMap from '@/common/components/PostMap';
import { useMissingPets } from '@/hooks/useMissingPets';
import { usePetSpecies } from '@/hooks/usePetSpecies';
import { useComments } from '@/hooks/useComment';
import useUserStore from '@/store/userStore';

const MissingDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUserStore((state) => state.user);

  // console.log("user id :",user);

  const { data, isLoading } = useMissingPets();
  const { data: species } = usePetSpecies();
  const { data: comments } = useComments('missing', id);

  // console.log("species",species );

  if (isLoading) {
    return <div>Loading...</div>; 
  }
  if (!data[id] || data[id].length === 0) {
    return <div>Not Found</div>;
  }
  const pet = data[id];
  // console.log("eptid",pet.id, pet.userId)

  // const matchedSpecies = species.find(s => s.id === pet?.refSpecies);
  const matchedSubSpecies = species[( pet.subSpecies)-1];


  const missingBtn = ()=>{
    navigate("/missing");
  };
  const myPageBtn = ()=>{
    navigate("/mypage");
  };
  const reportBtn = ()=>{

  };
  return (
    <Grid  container spacing={0} sx={{padding:'0 4%', fontFamily:'Gmarket_light'}}>
      <Grid size={12} sx={{ width:'100%', maxHeight:'76vh', display:'flex' ,color:"#fff" ,fontFamily: 'KBO_medium'}}>
        <Box id='postnav' sx={{background:' #436850'}} onClick={missingBtn} >실종 신고</Box>
        <Box id='postnav' sx={{background:' #5D9471'}}>
          {pet?.petName} {pet?.isMissing === true? ( <UserRoundSearch  strokeWidth={2} />) 
          : ( <HeartHandshake  strokeWidth={2}/>) } </Box>
      </Grid>

      <Grid container size={12} >
        <Box id='post' sx={{width:'100%',height: '75vh',textAlign:'center',borderRadius:'0 20px 20px 20px', padding: '4vh 5vw'}}>
      <EllipsisVertical id='postmenu'/>
          {/* 정보카드 */}
          <Grid container size={12}  sx={{width:'100%',height:{xs:'85%',sm:'37vh'} , display:'flex'}} >
              {/* 사진 */}
              <Grid size={{ xs: 12, sm: 4}}>
                <Card sx={{ maxWidth:{xs:'200px',sm:'90%'}  ,height:{xs:'17vh',sm:'34vh'},borderRadius:'20px'}}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover'}} src={pet?.imageUrl}/>
                </Card>
              </Grid>
              {/* 정보상세 */}
              <Grid container size={{ xs: 12, sm: 4}} id='d-text' 
              fontSize={{xs:'smaller',md:'medium'}}
              sx={{ maxWidth: '95%' ,maxHeight:{xs:'auto',sm:'34vh'}}} >
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
              <Grid size={{ xs: 12, sm: 4}}>
                  <Card sx={{ width: '100%' ,height:{xs:'15vh',sm:'34vh'}, background:' #fff',borderRadius:'20px',boxShadow:'3px 3px 3px rgb(177, 177, 177)'}}>
                    <PostMap lostLocation={pet?.lostLocation || {}}/>
                    <Box id='loc' sx={{display:'flex', alignItems:'center',mt:1,marginLeft:'10px'}}>
                      <MapPin  strokeWidth={2.75} color='#436850'  />
                      <h3 >실종 당시 위치 </h3>{pet?.lostLocation.number_address}
                      </Box>
                  </Card>
              </Grid>
          </Grid>
          {/* 댓글 */}
          <Grid size={12}  sx={{width:'82vw',height:{sx:'',md:'32vh'},paddingBottom:'10px', background:' #fff',borderRadius:'20px',}}>
            <PostComment comments={comments || {}} postId={id} postType={'missing'}/>
          </Grid>

        </Box>
      </Grid>
      {/* 하단 버튼 */}
      {user?.id === pet.userId ? ( 
        <Grid id='bottombtn' size={12} sx={{ marginTop: '1vh', display: 'flex' }}
        onClick={myPageBtn}
        >
          <Box sx={{ maxHeight: '4vh' }}>
            실종 제보 보기
          </Box>
        </Grid>
      ) : (
        <Grid id='bottombtn' size={12} sx={{ marginTop: '1vh', display: 'flex' }}
        onClick={reportBtn}
        >
          <Box sx={{ maxHeight: '4vh' }}>
            제보하기
          </Box>
        </Grid>
      )}
    </Grid> 
  )
}

export default MissingDetailPage
