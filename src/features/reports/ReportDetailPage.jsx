import React from 'react'
import './ReportDetailPage.css'

import { useParams } from "react-router-dom"
import { Grid ,Box, Card ,InputBase} from '@mui/material';
import { EllipsisVertical ,MapPin ,Mars,Venus ,UserRoundSearch,HeartHandshake } from 'lucide-react';

import PostComment from '@/common/components/PostComment';
import PostMap from '@/common/components/PostMap';
import { useComments } from '@/hooks/useComment';
import { usePetSpecies } from '@/hooks/usePetSpecies';
import { useReportsPets } from '@/hooks/useReportsPets';

const ReportDetailPage = () => {
  const { id } = useParams();
    // console.log("pm id :",id);

  
  const { data : pet, isLoading } = useReportsPets(id);
    const { data: species } = usePetSpecies();
    const { data: comments } = useComments('report', id); 
  
    if (isLoading) {
      return <div>Loading...</div>; 
    }
    if (!pet || pet.length === 0) {    return <div>Not Found</div>;  }

    const matchedSpecies = species[( pet.refSpecies)-1] ;
    const repTitle = pet?.description.length > 15 ? `${pet?.description.slice(0,15)}...`: pet?.description;
  
    // console.log("refSpecies",species);

    const shareBtn = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href); // 현재 URL을 클립보드에 복사
        alert('현재 주소가 복사되었습니다!'); // 성공 메시지
      } catch (err) {
        console.error('주소 복사 실패:', err);
        alert('주소 복사에 실패했습니다.'); // 실패 메시지
      }
    };

  return (
    <Grid  container spacing={0} sx={{padding:'0 4%', fontFamily:'Gmarket_light',marginTop:'1vh'}}>
      <Grid size={12} sx={{ width:'100%', display:'flex' ,color:"#fff" ,fontFamily: 'KBO_medium'}}>
        <Box id='postnav' sx={{background:' #436850'}} >목격제보</Box>
        <Box id='postnav' sx={{background:' #5D9471'}}>{repTitle}</Box>
        <Box id='postnav' sx={{background:' #5D9471', marginLeft:'auto'}}
         onClick={shareBtn}
        >
          공유 하기
        </Box>
      </Grid>

      <Grid container size={12} >
        <Box id='post' sx={{width:'100%',height: '76vh',textAlign:'center',borderRadius:'0 0 20px 20px', padding: '4vh 5vw'}}>
      {/* <EllipsisVertical id='postmenu'/> */}
          {/* 정보카드 */}
          <Grid container size={12}  sx={{width:'100%',height: {xs:'85%',sm:'37vh'}, display:'flex'}} >
              {/* 사진 */}
              <Grid size={{ xs: 12, sm: 4}}>
              <Card sx={{ maxWidth:{xs:'200px',sm:'90%'}  ,height:{xs:'17vh',sm:'34vh'},borderRadius:'20px'}}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover'}} src={pet?.imageUrl}/>
                </Card>
              </Grid>
              {/* 정보상세 */}
              <Grid container size={{ xs: 12, sm: 4}} id='d-text' 
              fontSize={{xs:'smaller',md:'medium'}}
              sx={{ Width: '95%' ,maxHeight:{xs:'auto',sm:'34vh'}}} >
                <Grid container size={12} >
                  <h2>{repTitle} </h2> 
                  <h3 style={{ marginLeft: 'auto'}}>{pet?.lostDate}</h3>
                  </Grid>
                <Grid container size={12} >
                  <h3>품종</h3>   {matchedSpecies?.name}</Grid>
                <Grid container size={12}>
                  <h3>특징</h3> {pet?.description}</Grid>
              </Grid>
              {/* 지도 */}
              <Grid size={{ xs: 12, sm: 4}}>
                  <Card sx={{ width: '100%' ,height:{xs:'15vh',sm:'34vh'}, background:' #fff',borderRadius:'20px',boxShadow:'3px 3px 3px rgb(177, 177, 177)'}}>
                    <PostMap lostLocation={pet?.sightedLocation  || {}}/>
                    <Box id='loc' sx={{display:'flex', alignItems:'center',mt:1,marginLeft:'10px'}}>
                      <MapPin  strokeWidth={2.75} color='#436850'  />
                      <h3 >목격 당시 위치 </h3>{pet?.sightedLocation.number_address}
                      </Box>
                  </Card>
              </Grid>
          </Grid>
          {/* 댓글 */}
          <Grid size={12}  sx={{width:'82vw',height:{sx:'',md:'32vh'},paddingBottom:'10px', background:' #fff',borderRadius:'20px',}}>
            <PostComment comments={comments || []} postId={id} postType={'reports'}/>
          </Grid>

        </Box>
      </Grid>

    </Grid> 
  )
}

export default ReportDetailPage
