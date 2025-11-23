// --- TAB / PENCERE BAZLI OTURUM ---
// Eğer bu sekmede daha önce giriş yapılmışsa admin-panel'e yönlendir
if (sessionStorage.getItem("loggedIn") === "true") {
    window.location.href = "admin-panel.html";
}

// Şifre kontrol fonksiyonu
function login() {
    const password = document.getElementById("password").value;

    // Şifreni buraya yaz
    const correctPassword = "12345";

    if (password === correctPassword) {
        // Bu sadece bu sekme için geçerli olacak
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "admin-panel.html";
    } else {
        alert("Yanlış şifre Reis!");
    }
}
