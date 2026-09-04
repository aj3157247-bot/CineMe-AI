let selectedGenre = 'sci-fi';

// مدیریت انتخاب ژانرها
document.querySelectorAll('.genre-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.genre-btn').forEach(btn => {
            btn.classList.remove('border-amber-500', 'bg-amber-500/10', 'text-amber-400');
            btn.classList.add('border-slate-800', 'bg-slate-800/50', 'text-slate-300');
        });
        e.target.classList.remove('border-slate-800', 'bg-slate-800/50', 'text-slate-300');
        e.target.classList.add('border-amber-500', 'bg-amber-500/10', 'text-amber-400');
        selectedGenre = e.target.getAttribute('data-genre');
    });
});

document.getElementById('generateBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('uploadImage');
    if (fileInput.files.length === 0) {
        alert('لطفاً ابتدا یک عکس انتخاب کنید!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            createPoster(img, selectedGenre);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(fileInput.files[0]);
});

function createPoster(userImg, genre) {
    const canvas = document.getElementById('posterCanvas');
    const ctx = canvas.getContext('2d');

    // تنظیم ابعاد بوم (مناسب استوری اینستاگرام / عمودی)
    canvas.width = 1080;
    canvas.height = 1350;

    // ۱. پس‌زمینه پوستر
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ۲. رسم تصویر کاربر به صورت دایره یا قاب مرکزی شیک
    const imgSize = 700;
    const imgX = (canvas.width - imgSize) / 2;
    const imgY = 180;

    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    // محاسبه تناسب تصویر کاربر
    ctx.drawImage(userImg, imgX, imgY, imgSize, imgSize);
    ctx.restore();

    // حاشیه نئونی دور عکس
    ctx.beginPath();
    ctx.arc(canvas.width / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
    ctx.lineWidth = 12;
    ctx.strokeStyle = genre === 'sci-fi' ? '#38bdf8' : '#f43f5e';
    ctx.stroke();

    // ۳. متن‌ها و عنوان‌های سینمایی
    ctx.textAlign = 'center';

    // عنوان بالا
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 36px "Vazirmatn", sans-serif';
    ctx.fillText('به زودی در سینماهای سراسر کشور', canvas.width / 2, 110);

    // عنوان اصلی فیلم بر اساس ژانر
    let mainTitle = genre === 'sci-fi' ? 'آخرین هکر زمین' : 'پادشاه تنهایی';
    let subTitle = genre === 'sci-fi' ? 'ماموریت غیرممکن برای نجات وای‌فای' : 'داستان واقعی یک غرغروی جذاب';

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 70px "Vazirmatn", sans-serif';
    ctx.fillText(mainTitle, canvas.width / 2, 980);

    // زیرنویس طنز
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 42px "Vazirmatn", sans-serif';
    ctx.fillText(subTitle, canvas.width / 2, 1060);

    // فوتر پوستر (تبلیغاتی)
    ctx.fillStyle = '#475569';
    ctx.font = '30px "Vazirmatn", sans-serif';
    ctx.fillText('ساخته شده در استودیو هوش مصنوعی', canvas.width / 2, 1260);

    // نمایش بخش خروجی
    document.getElementById('resultContainer').classList.remove('hidden');
    
    // اتصال دکمه دانلود
    const dataURL = canvas.toDataURL('image/png');
    document.getElementById('downloadBtn').href = dataURL;
}
