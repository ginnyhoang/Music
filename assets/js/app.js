$ = document.querySelector.bind(document);
$$ =  document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'HP_PLAYER';

const heading = $('header h2');
const cdthumb = $('.cd-thumb');
const audio = $('#audio');
const cd  = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isOption: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Lời nói điêu trên môi em',
            singer: 'Đỗ Nguyên Phúc ft & LilZpoet',
            path: './assets/music/loi_noi_dieu_tren_moi.mp3',
            image: './assets/img/loi_noi_dieu_tren_moi.jpg' 
        },
        {
            name: 'Chẳng thể tìm được em',
            singer: 'PhucXP',
            path: './assets/music/chang_the_tim_duoc_em.mp3',
            image: './assets/img/chang_the_tim_duoc_em.jpg' 
        },
        {
            name: 'Khuê mộc lang',
            singer: 'Hương Ly, Jomble',
            path: './assets/music/khue_moc_lang.mp3',
            image: './assets/img/khue_moc_lang.jpg'
        },
        {
            name: 'Yêu là cưới',
            singer: 'Phát Hồ, X2X',
            path: './assets/music/yeu_la_cuoi.mp3',
            image: './assets/img/yeu_la_cuoi.jpg'
        },
        {
            name: 'Rồi tới luôn',
            singer: 'Nal',
            path: './assets/music/roi_toi_luon.mp3',
            image: './assets/img/roi_toi_luon.jpg'
        },
        {
            name: 'Dịu dàng em đến',
            singer: 'Erik',
            path: './assets/music/diu_dang_em_den.mp3',
            image: './assets/img/diu_dang_em_den.jpg' 
        },
        {
            name: 'Sài gòn hôm nay mưa',
            singer: 'Jsol & Hoàng Duyên',
            path: './assets/music/sg_hom_nay_mua.mp3',
            image: './assets/img/sg_hom_nay_mua.jpg' 
        },
        {
            name: 'Sài gòn đau lòng quá',
            singer: 'Hứa Kim Tuyền & Hoàng Duyên',
            path: './assets/music/sg_dau_long_qua.mp3',
            image: './assets/img/sg_dau_long_qua.jpg' 
        },
        {
            name: 'Chàng trai áo sơ mi hồng',
            singer: 'Hoàng Duyên',
            path: './assets/music/chang_trai_ao_so_mi_hong.mp3',
            image: './assets/img/chang_trai_ao_so_mi_hong.jpg' 
        },
        {
            name: 'Hạ còn vương nắng',
            singer: 'Datkaa, Kido',
            path: './assets/music/ha_con_vuong_nang.mp3',
            image: './assets/img/ha_con_vuong_nang.jpg' 
        },
        {
            name: 'Hôm nay em cưới rồi',
            singer: 'Khải Đăng',
            path: './assets/music/hom_nay_em_cuoi_roi.mp3',
            image: './assets/img/hom_nay_em_cuoi_roi.jpg' 
        },
        {
            name: 'Lỡ say bye là bye',
            singer: 'Lemese & Changg',
            path: './assets/music/lo_say_bye_la_bye.mp3',
            image: './assets/img/lo_say_bye_la_bye.jpg' 
        },
        {
            name: 'Phải chăng em đã yêu',
            singer: 'Juky San & RedT',
            path: './assets/music/phai_chang_em_da_yeu.mp3',
            image: './assets/img/phai_chang_em_da_yeu.jpg' 
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex?'active' : ''}" data-index = ${index}>
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                 </div>
            `
        })

        playlist.innerHTML = htmls.join(' ');
    },

    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;
      

        //Xử lý CD quay/ dừng
        const cdthumbAnimate = cdthumb.animate([
            {
                transform: 'rotate(360deg)',
            }
        ],{
            duration: 10000,
            iterations: Infinity,
        })
        cdthumbAnimate.pause()

        //Xử lý phóng to/ thu nhỏ cd
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        //Xử lý khi click play 
        playBtn.onclick = function () {
            if(_this.isPlaying){
                audio.pause();
            }
            else{
                audio.play();
            }
        }

        // Khi song được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdthumbAnimate.play();
        }

         // Khi song bị pause
         audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdthumbAnimate.pause();
        }


        //Khi tiến độ bài hát change
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }



        //Xử lý khi tua song 
        progress.oninput = function (e){
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime
            audio.pause()
        }
        
        progress.onchange = function (e) {
            const seekTime = e.target.value * ( audio.duration / 100 );
            audio.currentTime = seekTime;
            audio.play();
        }


        //Khi next song 
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRadomSong();
            }else{     
                _this.nextSong();
            }
            audio.play();
            app.activeSong();
            _this.scrollToActiveSong();
        }


         //Khi prev song 
         prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRadomSong();
            }else{     
                _this.prevSong();
            }
            audio.play();
            app.activeSong();
            _this.scrollToActiveSong();
        }

        //Xử lý random bật/tắt
        randomBtn.onclick = function() {
           _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active',_this.isRandom);
            _this.setConfig('isRandom', _this.isRandom);
        }


        //Xử lý phát lại 1 song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active',_this.isRepeat);
            _this.setConfig('isRepeat', _this.isRepeat);
        }


        // //Xử lý next song khi audio ended
        audio.onended = function () {
            if(_this.isRepeat){
                audio.play();
            }else{
                nextBtn.click();
            }
        }

        //Lắng nghe click vào playlist
        playlist.onclick = function(e) {
            let down = $$('.download');
            let songNode = e.target.closest('.song:not(.active)');
            let songOption = e.target.closest('.option');
            if(songNode || songOption ) {
                //Xử lý khi click vào song 
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                    app.activeSong();
                }
                if(songOption) {

                }

             } 
        }

    },

    
     //active song 
    activeSong: function() {
        let itemSong = $$('.song');
        itemSong.forEach((item, index) => {
            if(index === this.currentIndex) {
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }
        })
    },

    // Scroll to active song
    scrollToActiveSong: function ( ) {
        let SongActive = $('.song.active');
        setTimeout(() => {
            if(this.currentIndex < 3){
                SongActive.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                })
            }else{
                SongActive.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                })
            }
        }, 300);
    }
    ,

    defineProperties: function ( ) {
        Object.defineProperty(this, 'currentSong', 
            {
                get: function () {
                return this.songs[this.currentIndex];
                }
            })
    },

    loadCurrentSong: function ( ) {
        heading.textContent = this.currentSong.name;
        cdthumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    nextSong: function ( ) {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function ( ) {
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRadomSong: function ( ) {
        let newwIndex ;
        do{
            newwIndex = Math.floor(Math.random() * this.songs.length)
        } while(newwIndex === this.currentIndex);
        this.currentIndex = newwIndex;
        this.loadCurrentSong();
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },


    
    start: function() {

        //Gán cấu hình từ config vào app
        this.loadConfig();
        //Định nghĩa các thuộc tính cho Object
        this.defineProperties();

        //Lắng nghe và sử lý các sự kiện
        this.handleEvents();

        //tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //Render playlist
        this.render();

        //Hiển thị trạng thái ban đầu của button Random and Repeat 
        repeatBtn.classList.toggle('active',this.isRepeat);
        randomBtn.classList.toggle('active',this.isRandom);
    }
    
}
 


app.start();
