# React 과제 Youtube App 만들기

## 🖥️ 프로젝트 소개
- 유튜브 클론 프로젝트

## ⏰ 진행 기간
- 23.03.10 - 23.03.16

## ⚙️ 사용 기술
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=React-Query&logoColor=white"/> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=PostCSS&logoColor=white"/>

## 👤맴버 구성

| 장문정 | 홍성민 | 이정재 | 조민호 |
| -----  |  ----- | ------ | ------ |
<a href="https://github.com/gamangee"> <img width="70" height="70" src="https://user-images.githubusercontent.com/98649953/225550633-b6975a18-4b45-44d2-84be-4a7d95beb9ff.png"> </a> |<a href="https://github.com/dragong-sm">  <img width="70" height="70" src="https://avatars.githubusercontent.com/u/117700630?v=4" alt="Dragong"></a>  |<a href="https://github.com/j-plum">  <img width="70" src ="https://user-images.githubusercontent.com/98649953/225549031-a4a69541-3845-4569-88ac-c7a5033a76a1.png"> </a> |<a href="https://github.com/minh0518">  <img width="70" height="70" src="https://user-images.githubusercontent.com/98649953/225549796-bde74541-c1af-4db3-8d65-a3ee6fe6afd0.png"> </a> |

## ✍🏻 역할

> **공통**
> - CSS 구성
> - Youtube API 호출
> - useQuery 사용

> **장문정**
> - ```VideoList``` ```VideoItem``` ```RelatedVideo```
> - 동영상 목록 생성
> - 관련있는 동영상 구성

> **홍성민**
> - ```Comment``` ```CommentItem```
> - 댓글 목록 생성
> - 댓글 좋아요 및 답글 기능

> **이정재**
> - ```SearchHeader``` ```NotFound```
> - 전체 구조 및 라우팅 설정
> - 라이트/다크 모드
> - 동영상 검색 기능

> **조민호**
> - ```VideoDetail``` ```ChanneInfo```
> - 동영상 세부 정보
> - 채널 세부 정보


## 📌 주요 기능 및 영상
- 실시간 인기 동영상 확인
- 원하는 동영상 검색
- 관련 동영상 및 댓글 확인
- 동영상 정보 확인 및 시청
- 동영상 & 채널 & 댓글 좋아요 기능
- 라이트 혹은 다크 모드 변경
- 화면 크기에 따른 반응형 CSS

## 🎬 구현 영상

✅ 동영상 목록 확인 및 검색

<img width="550" src="https://user-images.githubusercontent.com/117700630/225564260-c3edd430-cf87-4f8a-a9f3-4ca7d93fe1bf.gif">

✅ 동영상 정보

<img width="550" src="https://user-images.githubusercontent.com/117700630/225563076-301fa6fa-6d52-4d50-a5ed-84e08988ca5c.gif">

✅ 댓글

<img width="550" src="https://user-images.githubusercontent.com/117700630/225566020-03291112-ff1f-4f0f-988e-57589e24406c.gif">

✅ 테마 변경  
- useContext를 사용
<img width="550" src="https://user-images.githubusercontent.com/117700630/225563020-e2aaf687-f416-4027-b68f-384538fd0465.gif">

✅ 반응형  
- flex & grid 사용

<img width="550" src="https://user-images.githubusercontent.com/117700630/225567679-05611677-efa2-4faa-99ef-90b282f9a46f.gif">

<img width="550" src="https://user-images.githubusercontent.com/117700630/225568807-f40cfc2f-56ca-41fd-b499-d86e3347387c.gif">


## 🤔 고찰

```1️⃣ VideoDetail Page```  
특정 동영상 페이지에서 채널 정보를 불러올 때, 리액트 쿼리가 정상적으로 작동하지 않는 문제를 겪었습니다.  
처음 선택한 동영상의 data는 제대로 불러와졌으나 그 후 선택된 동영상에서는 특정 video data가 받아와지지 않았습니다.  
원인을 찾을 수 없어 임시방편으로 **useEffect()를 사용**하여 렌더링 시키는 방식으로 해결하여 진행하였습니다.  
결론적으로, key 값에 videoId를 추가하지 않아 videoId가 변경되어도 쿼리를 요청하지 않았던 것을 알게 되어 해결하였습니다.


```2️⃣ Youtube API```  
기본적으로 잘 알려진 Youtube API를 사용하여 적용 및 기능 구현을 완료했지만,  
대댓글(답글)과 같은 관련된 다양한 API에 대해서는 시간관계상 알아보지 못해 적용할 수 없었던 점에서 아쉬움이 남았습니다.  
따라서 해당 과제 이후에도 적용할 수 있는 부분이 있다면 수정해보고 싶습니다.

```3️⃣ CSS ```  
최근 리액트와 함께 사용할 수 있는 스타일 라이브러리 및 프레임워크가 다양해졌습니다.   
이런 기술을 사용하면 CSS 파일을 별로도 생성하지 않아도 되는 장점이 있기 때문입니다.  
따라서 리팩토링 시간을 통해 이러한 기술을 적용해 보는 것도 개인 성장에 도움이 될 것 같습니다.
