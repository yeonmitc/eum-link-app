import React from 'react'
import './ReportDetailPage.css'
import { Grid ,Box, Card ,InputBase} from '@mui/material';
import { EllipsisVertical ,MapPin } from 'lucide-react';
import PostComment from '@/common/components/PostComment';
import PostMap from '@/common/components/PostMap';


const ReportDetailPage = () => {
  return (
<Grid  container spacing={0} sx={{padding:'0vh 4%', fontFamily:'Gmarket_light'}}>
      <Grid size={12} sx={{ width:'100%', display:'flex' ,color:"#fff" ,fontFamily: 'KBO_medium'}}>
         <Box id='postnav' sx={{background:' #436850'}}>목격 제보</Box>
        <Box  id='postnav' sx={{background:' #5D9471'}}>특징일곱글자까지 ...</Box>
      </Grid>

      <Grid container size={12} >
        <Box id='post' sx={{width:'92vw',height: '76vh',textAlign:'center',borderRadius:'0 20px 20px 20px', padding: '4vh 5vw'}}>
          <EllipsisVertical id='postmenu'/>
          {/* 정보카드 */}
          <Grid size={12}  sx={{width:'82vw',height: '37vh', display:'flex'}} >
              {/* 사진 */}
              <Grid size={4}>
                <Card sx={{ maxWidth: '24vw' ,height: '34vh',borderRadius:'20px'}}>
                  <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"/>
                </Card>
              </Grid>
              {/* 정보상세 */}
              <Grid size={4} container  spacing={1} sx={{ maxWidth: '30vw' ,maxHeight: '34vh', color:'gray'}} >
                <Grid container size={12} spacing={0} >특징</Grid>
                <Grid container size={12} spacing={0} >종   믹스</Grid>
                <Grid container size={12} spacing={0} >발견시간 </Grid>
                <Grid container size={12} spacing={0} >특징 {}</Grid>
              </Grid>
              {/* 지도 */}
              <Grid size={4}>
                  <Card sx={{ width: '27vw' ,height: '34vh', background:' #fff',borderRadius:'20px',boxShadow:'3px 3px 3px rgb(177, 177, 177)'}}>
                    <PostMap/>
                    <Box sx={{display:'flex', alignItems:'center',mt:1,marginLeft:'10px'}} >
                      <MapPin strokeWidth={2.75} color='#436850'  />
                      <h3  style={{ marginLeft: '8px' }} >실종 당시 위치 {}</h3>
                      </Box>
                  </Card>
              </Grid>
          </Grid>
          {/* 댓글 */}
          <Grid size={12}  sx={{width:'82vw',height: '32vh', background:' #fff',borderRadius:'20px',}}>
              <PostComment/>
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

export default ReportDetailPage
