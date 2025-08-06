import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import swapnilImg from '../assets/SWPNIL.jpg';
import anupImg from '../assets/ANUPSIR.jpg';
import vinodImg from '../assets/vinod sir.jpg';
import coreTeamImg from '../assets/CORE TEAM.jpg';

// Placeholder images (replace with real ones as needed)
const teamPhotos = [
  { name: 'Dr. Swapnil Rajendra Desai', role: 'Training and Placement Officer', img: swapnilImg },
  { name: 'Anup Wamanrao Jadhav', role: 'Career Counsellor', img: anupImg },
  { name: 'Vinod Rohidas Borade', role: 'Clerk', img: vinodImg },
];
const studentTeamImg = coreTeamImg;
const recruiterLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Godrej_Logo.svg/1200px-Godrej_Logo.svg.png',
  'data:image/jpeg;base64,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',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSyz2rKsiLtX8F2CbYZlsa3BTAgS8_d0tAtQ&s',
  'data:image/png;base64,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',
  'data:image/png;base64,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',
  'data:image/png;base64,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',
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQERUSEBAVEBIVEBIWGRYVFxYQEBAVGxUWFxkYGRgdICggGBsmHRUXIzEhJSkrLi8uFx8zODMtNygtLisBCgoKDg0OGxAQGy8eIB4tLSstKy0tLTEtLS0tLTUtKy0uLS02LS0tLS4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYEBwECAwj/xABJEAABAwICBQcHCQUGBwAAAAABAAIDBBEFEgYhMUFRBxMiYXGBkTJCUqGxwdEUIzRicnN0svAzU1SSkxYXgsLh8RU1Q2NkotL/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAwQFAgH/xAAsEQACAgICAQMCBQUBAAAAAAAAAQIDBBESITETQXFRgQUUMjNCImGx8PGR/9oADAMBAAIRAxEAPwDeKIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA4XKKpaV6cQUV2MtNN6IPRZ9o7uxdQhKb1FHMpKK2y1kqOnx+jYbPqoWnhzjbjuutJYzpRV1hPOykN9BvRjHdv71ErQh+Hv+TKk8vX6UfQDNJKEmwq4f6jR71IwTseLscHji0hw8QvnALKo62WF2aKR0buLSWr2X4cv4yI1na8o+iVytW6Pco0jCG1Y5xvptFnjtGwjwWyKGtjnYJInh7TsIVK2idb/qRbquhZ4MpERQkwREQBFh4lXsp43SSGzQO8ngOtUR2n8+e4iZkvsN81u2+3rspqqJ2dxRDZfCvqTNjIsPCcQbUxNlZqDhsO0HYR6lmKFpp6ZKmmto5REQ9CIiAIiIAiIgOERVDlC0o+Rxc3Efn5Abf9tu93uH+i6hBzkoo4nNQjtkXyhaccxempXXl2PeP+n1DrWp85cbkkknWTtK9Mrnu3uc49pJK2VofydNs2atFydYi4fa49i2Uq8aHf/TN3O+fRQMNwqoqDaGF8nYNXjsCsVPye4g8XMbWX9J1iPBblpqZkbQ2NgY0DUAAAvVU5Z82/6UWliR92aUn0BxBgvzQf1NcCVA1dBLCbSxujP1hb/dfRSxa2himbllY17TuIuvYfiEl+pHE8KL/Sz55CndF9IpaKS7elGT0mbiPcVYtK9ADGDLSXc3aY9rh2cexUSxBsdS0Izrvh9TPnGdM/ofQOG4hHURtkidma4d4PA8CstaU0R0kfRSb3ROIzt/zDrW46OqZMxskbg5jhcELHyMd1S/sauPkK2P8Ac910llaxpc42AFyeAXe61xp1pLzhNPCegD03Dzjw7FxTU7ZaR3daq47ZG6W4+auSzdUTT0R6X1lG4Vh76iRscY1k7dzRvJWHCwuIa0XJNgBvK2xolgIpIruF5Xi7jw+qFq22Rx69L7GXVXLIs2/uSeFYeynibEzY0d5O8nrWYiLGbbe2bKSS0jlEReHoREQBERAEREBhYriEdNC+aQ2axtzxPADrJ1d60FjGIyVUz5pD0nm9tzRsDR2K+cq2LFz2UjTqaBI/rOvIPafBUzBMMNRURxDzna+po1u7NQWvhVKut2S/1GRmWuyxVxLlyZ6MCwq5m3/dtP5lsxqw6WNrWtYwWa0AADcAs4BZt1rsk5M0qq1XFRRyiIoiUIiIDhUDTrQ8PBqKZtnjW9g8/rHWtgLghSVWyrltEVtUbI6Z87gK06G6Tuo35HkugcdY9A+kFI8oOi/NE1MLfm3HptGxh9LsKpIW3Fwvr+TFkp0T+DaGmmlTY4+ap3gvkbcuHmtPvK1sCugVp0J0eNTJzkg+aYdf1zw7FxGEMeDO5TnkTRPaBaO5QKiUaz5AO4ekr0urWgCwFgF2WPba7Jcma9VSrjxQREUZKEREAREQBERAF1c6wJ4BdlH49PzdNM+9ssTz4NK9S29Hjels0ti1QaieWY688riPsjot9QCsXJzSjnpZSPIY1o7XEk/lCrNMWOaMpBAAGr9alcdBnhscvHnvVzbP9VtZT40aRjYq5X7Zf6E3JPBZqjsGkuHdqkViG0EREAREQBEXjVVLIml8jgxoFyTqATyG9HaaJr2lrgHNcCCDsIK01pbgJoprC5ifcsPV6PaFP4vyiPbO3mWfMNd0r+XKN/2Rr1dncrbidJDiVJ0CHB7czHei79aj3q9V6mO05eGULeGQmo+Uaaatj8nGNAt+TPsHC5ZuzDaR2rX1RTuie5jxZzSQRwK70dQ6J7XsNnNdcFaN1athoz6bHVPZvhFG4BiraqFsjdtrOHou3qSWDJOL0zejJSW0coiLw9CIiAIiIAiIgOFD6YMLqCpA2mnk/KVMLwroBJG9h2OY4eIsuoPUkzyS2mfMEUhabtJB6lc9BMXPOvjkNy9oIPW2/jq9ip1RCY3uY7U5rnNPaCQu9NM5jg5psQbgrftgrIOP1MiuXCfI31gFeGyZSdThbvVoWmsJx4StGvK8bR18Qr9gOk7HgMmIa7YHHY5YE4OD0zWjJSW0WdF1a4HWDcLlcnQRRuJY7TU4vLM1vVe7j3Kg6Qco733ZSNyD03eUewblNXROx9IisuhBdsvOOaQwUg6bs0h2Mb5Z+AWtMexuardeQ2aD0WDyG/E9arElXI5xc55LidZJuSuzXvcbAlxO4ayVrUYsKu32zHyciy16XSOawX2K1cnWPmlfzMrrwyO1X2Ru49hUCMHqsubmJLccpWNlINiLEcdoU1kYWxcWR1ylU+RsTlHwW4FVGOAfb1O9yoLVsjQrGBWQOpZzd4ZbX57PiFRcYw51NM+J246jxbuKr40nHdUvK/wT5MVLVkfD/wAkpodjZpZukfmn2DuA4OW2muBFxrBC0OFsjQHHOcZ8nkPTYOifSbw7lBm0bXNfcmwr9Pg/sXJERZhqBERAEREAREQBERAaH5UsGNNWueBaOYZwd2bzx46/8SqTV9EaW6Ox4hTmJ/RcOkx/oO+HFaGxnBp6OUxTsyuGw+a4cQd62sO9TiovyjMyKnGW14ZixuINwbFScGLyjac3aotq9GqzOqE/1LZDGco+GWGn0pqGeQ9zexxXFVpPVyajM7xUG1d1EsapPaR3K+xryekkrnG7iXHidaBcMaSbAXPAK56NaAzz2fPeGPgf2jh1DcpJ2QrXfRCoTsfXZXsGwiareI4WFx3nzWjiStv6M6KQUbBqEkttbyL+HAKUwrCoaVgZCwNH/se071nLIyMuVnS6Ro0Ysa+32ziyrukuisNW0kARyganAWv1O4hWNFWhOUHtMsThGa00aQa2egqBmBZIx3c4e8FWrTOJlVTx1sXCzurt71btIcBirGZXCzx5Lxtb8QqhgFNJA+WgqR0JWnIfNJ4haKvVmp/yXn4M+VDr3D2fj5KWFk0NU+GRsjDZzTcLrWUzopHRuFi1xC8wtDqS+TO7izdGDYiyphbK3eNY9F28LPWu+TeqcJnxX6JjzW4EED/MtiLCyK/Tm4m7j2epWpBERQk4REQBcIoHTTE30tK6WORrHhwtmGbP9X9cF1GLlJRXuczkoxcn7E8i1FQae1z5WMfKxjXPAJyXsFttmwb9W3ipLqJVa5e5FTkRu3x9jssDF8Igq2c3PGJG7r+U08Qdyz1VtP8AFqijgZLA8C8gYQW5r3BN+ryfWuKouUko+Tu2SjFt+CqYvyVOBJpZgR6Mmoj/ABDb6lX5OT/Emm3MZusPYR7dSvGgOkVXXSvE0jckbWmwYAXXvv3bFfFdlk3UvhLTK0KqrY8o9I0fT8n+JOOuANHEvYPerBhnJc8kGonDR6LAXHxOxbQXKilm2vx0SLFgiEwXRakpLGKIF3pv6b/Hd3KaWuNNdKa2iqTHHIwsLA8AsF2gki3Xs9aiI9N8VcLtbmB3iIkFdflbbFzb8kby6q24pPo28i1E7TXFgLlthxMRAWfgfKVJnDaqNpYSBnZdpb1kHaFy8K1Lfk9WdU3p9GzkXVjw4Ag3BAIO4ha9050nrKKpEccjSx0YeAWC7dZFr7/J9agqqdkuK8k9tsa48n4NiLFrKGOXLnGtpu0+c09SitC66eopWzTvDnPJsA3KGgEjv2KfXMk4Sa90dRkpxT9mUrTjRt8zhPA3M61nNG13AjiVTYsFqnGwp5L/AGCP9la9PtIquhlj5mRuSRrjYsBLbW379qk9AMWnrIXyzvB+cLAA0NtYAk9flepaELba6VLpoz51VWXOPaZ20N0edStL5bc68AWGvIOHarQi6v2HXbVt4KhObnLkzQrgq46Ryi1FiGntcyV7GSse1ryA7m7XCv8AoXiclVStlkkD3lxByjLk+r+uKltxZ1x5SIasqFkuK8k+iIq5ZOFqblQxnnZxTsPRi29bzt8FsfSLFBS075jta3oji4+SPFah0Tw51dWjPdwzc488Rf4q/hQS3bLxEz82beqo+5h4vgctKyJ79QlZmH1TwK2toBjPyqlaHG8kfQdxt5p8PYvXTTBRVUjmNHSYMzO0DYtbaA4x8lqwHmzJOg6+7gerWppS/M0t+8SGMfy1yXszdSpXKz9CZ+IZ+SRXUKlcrP0Jn4hn5JFRxv3Y/Jeyv2ZfBDcj/wC0qPsR+1y2ctY8j/7So+xH7XLZykzf3mcYP7KOURFULZqDlW+mj7hn5nK5aFYrTMooWvniY4M1hz2tcNZ3Eqm8q300fcM/M5c4JyfvqoGTCoawPF7ZCbd91ryjCWPHk9GPGU45E+K2zZb8bowDeph/qMPvWldJ5opKuV0AHNl+qwsDqFyOq6t/91sn8W3+mf8A6UrgfJzDC8PmkMxabhtg1l+JCjpnTRuSlskuhdfpOOiz6Osc2lgDtohjvfaOiFrbla+mR/hm/nkW2gtS8rX0yP8ADN/PIocJ7v38k2atUa+Cf0K0ko4KOOOWdrHjNcEOuNZPBT39scP/AIlvg74KkaM6BxVdMyZ0z2l19QAsLEhSn918P8RJ4N+C7thjub3J7OKp5CgtRWtEHymYtBUvhMEgkDWyA2vquW229is/JP8AQn/iH/kjVI020aZQOjDJHPzteTmtqsRw7Vd+Sf6G78Q/8kalyFFYqUfGyKhyeU+fkuqrOn+M/JaVwabSSdBvG28+HtVmJWldPMXNXVlrOkxh5tgG87z13JVPEq9Szvwi3mW+nX15ZG4bgctRDNMzWIgCeLt571Y+S7GuanMDj0ZdnU8bPH4K/aLYK2mpGxEXLm3f1l21ak0jw99DWOa27bOzsI4bR+upaEbVkcq//ChKp4/Cxfc3sijdHcUFXTxyjaW9IcHDaPFcLHcdPTNiMuSTXua85UMdbNI2njcHMj1uINwXnd3D2qf5K6GNlMZQQ573kHi0DUG+/vUs+tps72tpDIWPLSWxtIuO5ZOH4pAHc0IzA52xpbkDj7yrMshOpVxWitHGatdknsmCtHacUTIK2QRkWJDrDzCdo9/et5KNxT5PEx0ssTDbb0WlxPvXONf6Mm9bOsmj1opb0Rug+OCrpm3cOdYMrxvNtQd3qL5WZB8kY24zGdpA3kBr7n1hWrDBC5jZIWNaHDc0NPYbLtiDI8he+MSZQTbKHG2+11zGyMbeaXR1KqUquDfZpXRfSV9A55jja/OGg5ri1r8O1WH+9Co/h4/Fy2JRwU0zGvZFGWuF/Ib8F5VzaaItBhYXPdlDQxtz6lZnk1Te5Q7+StDFugtRn18FAPKhUfuI/FyveiFe+oo4pZDd785O7z3D2BZ5w6D9zH/I34LBw2sp4pTRxtyFlyB5uvpkD+ZQW2VyjqEdMnqrtjLcpbRrblSla6t6JByxNBtuN3G3r9av3J/K11BFlIJAIPUblTT6GEkkxMJO0lrSSsRuIQRTinY0Nc7X0QA0G2/uC9syFOpV68HNeO4WuzfklURR1ZinNuy8zI/Vta24VYtkgtRcq0rXVjQCCW07QbbjnebesLY3/Hf/AB5v5VmNpYpAHuhbdwBOZrc2sb+tTY9vpT5a2QZFLthx3oguTiZrqCMAglpeCN4OYq0KLr62CjDbsyh7rdBoHebKSikDgHNNwRcFcWS5ScvqSVx4wUfoaw5XpWmWBoIJayS43i5bb2KZ5JpB8ke2/SE7jbeAWssfUVZ5zA6cRuia6QszXLQdXasuKnZHfIxreOUBt/BTSyE6VXrwV447Vzs35ILTjHBSUzrOAleMrBvF9ru5a45PaJk1a0yEdEF4B8936PqWyqvFoiM0tI8ho2ujBsO9KbEIbhzKN4vscIwPWvashV1uCXb9xbjOyxSb6XsWBUHlYoGGFk1wHtdl63g7vUD4q+g3UVieIQh/NmI1DwL5A0Py9ZvsUNNnpzUia6v1IOP1Nf8AJfjrYZHU8jg1kmtpJsA8bu8exFeaOppXvEb6YQyHY18bRm7DZcru6yFk+WtEdNU64cd7PHBa2KOWqD5GsJqnmziBfUFxj1XFPzUcLhJJzzHDLryAayb7l2wSjiklqi+NjyKp+tzQ4jUOKnIKWOPyI2s+y0N9igLJ6hQmJ/PVMUG1rPnX92po8VNPcACTsAuqzhmG/KS+pdLLGZHkN5twbdg1Dd1IDMwI81LNTHYHc4z7DttuwqbIVYxCh+RyR1IkkkAeGSc47NZjri+zYCrOgK/A8UU7o3G0Et3sO5jtrm9i9cIjM8hqnjV5MQO5vpd6aXxh1PrAPzjPbZS9O0BrQBYZR7EB6ql1zXNqKmdmt0EtO+3FmQh48PYrooHDIw6qrWuFwTAD1gxlAS7qpgj52/QyZr9Vrqq0bHGenlf5U0kr+wWAaPBdYpHlgw8k5xOWOO8wNs+/VcWClsTaBVUoGwZx6kBOqOrcaghdkkeQ619hKkVxdARH9pqX94f5XfBSkMoe0ObscARu1HWu91ygIHSRgdJTA6wZXAjiMq4wqQ00ppXnoG7onHePR7V30g/a0v3x/KsrG8P5+PonLI05mO3hwQGLJ/zBn3DlOKp4TX8/VsLhlkbC5rwdzgVbEBG6R/RZfuysjDP2Mf3bfYsfSP6LL92VkYZ+xj+7b7EBlKuGR1JUSyPjc+KUtOdozZLC1iNwVjUdQYo2V743DJIx1spOst3OHUgPKOelqy0teHOjcHgbHtI6tq5WBpPExroXRgCoM7A3Lqe4X134tRATsFKyMuLG2L3ZndZ4r3REB5zRBzS1wuCLHrCQRNY0NaMrQLAcAvREB41VOyRpY9uZpFiDvXeNgAAGwADiu6IDxqqZkrcr25m3BsvUCy5RAF4RUrGOe9rbOflzH0rCw9S90QGM2ijEhlDBzhblLt5H6AXaWlY5zXubdzL5TwuvdEAUdWYJTTOzyxB7rWuS4ewqRRAQ/wDZii/cDxd8VKQRNY0NaLNa0ADgBqC9EQHhPSseWl7blhu08Day90RAYrMPiEhlDAJCLF2u5WUiIDyqIGyNLHjM0ixHELtEwNAaBYAWA4Bd0QBYVdhUE9jLGHEbDra4d41rNRAR9Fg9PCc0cQDvSJL3eLiSuVnogCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA//Z',
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="font-poppins bg-white min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Career Gateway Banner */}
      {/* <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        <a 
          href="/register" 
          className="block w-full text-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg text-base sm:text-xl transition-all mb-6 sm:mb-8 animate-bounce-in hover-lift hover-glow group"
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Career Gateway Student Registration Portal</span>
            <span className="sm:hidden">Student Registration Portal</span>
          </span>
        </a>
      </div> */}

      {/* TPO Department Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy text-center mb-4 animate-fade-in-up">
          Training and Placement Department
        </h2>
        <p className="text-base sm:text-lg text-gray-700 text-center mb-6 sm:mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          The Training and Placement Department provides placement and recruitment services to students through campus interviews. Many multinational and well-known Indian conglomerates regularly visit VPPCOE&VA for campus placement and recruitment every year. The department is equipped with modern facilities for written/online tests, group discussions, interviews, and more.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 stagger-animation">
          <div className="flex items-start gap-3 hover-lift p-3 sm:p-4 rounded-lg transition-all duration-300">
            <span className="text-purple-700 hover-scale">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 7V5h2v2H8zm0 2h2v4H8V9z" />
              </svg>
            </span>
            <span className="text-gray-700 text-sm sm:text-base">Written & Online Tests</span>
          </div>
          <div className="flex items-start gap-3 hover-lift p-3 sm:p-4 rounded-lg transition-all duration-300">
            <span className="text-purple-700 hover-scale">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z" />
              </svg>
            </span>
            <span className="text-gray-700 text-sm sm:text-base">Group Discussions & Interviews</span>
          </div>
          <div className="flex items-start gap-3 hover-lift p-3 sm:p-4 rounded-lg transition-all duration-300">
            <span className="text-purple-700 hover-scale">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V7h2v3z" />
              </svg>
            </span>
            <span className="text-gray-700 text-sm sm:text-base">Pre-placement Training & Mock Drives</span>
          </div>
          <div className="flex items-start gap-3 hover-lift p-3 sm:p-4 rounded-lg transition-all duration-300">
            <span className="text-purple-700 hover-scale">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-3a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
            </span>
            <span className="text-gray-700 text-sm sm:text-base">Career Counseling & Alumni Engagement</span>
          </div>
        </div>
      </section>

      {/* Statistics/Highlights Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-12 sm:py-16 animate-fade-in-up relative overflow-hidden">
        {/* Background Elements for Better Separation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/40 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-navy text-center mb-8 sm:mb-12 animate-fade-in-up">
            Statistics & Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center stagger-animation">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 hover-lift hover-glow transition-all duration-300 relative overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100/40 to-blue-100/40 rounded-full -translate-y-3 translate-x-3"></div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-bold text-purple-700 mb-3 animate-pulse-slow">804+</div>
                <div className="text-gray-700 text-base sm:text-lg font-medium">Students Placed</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 hover-lift hover-glow transition-all duration-300 relative overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-3 translate-x-3"></div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-bold text-purple-700 mb-3 animate-pulse-slow">739+</div>
                <div className="text-gray-700 text-base sm:text-lg font-medium">Internships Awarded</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 hover-lift hover-glow transition-all duration-300 relative overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100/40 to-blue-100/40 rounded-full -translate-y-3 translate-x-3"></div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-bold text-purple-700 mb-3 animate-pulse-slow">32.57 LPA</div>
                <div className="text-gray-700 text-base sm:text-lg font-medium">Highest Package</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8 hover-lift hover-glow transition-all duration-300 relative overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-100/40 to-red-100/40 rounded-full -translate-y-3 translate-x-3"></div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-bold text-purple-700 mb-3 animate-pulse-slow">180+</div>
                <div className="text-gray-700 text-base sm:text-lg font-medium">Companies Visited</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prime Recruiters Section with Infinite Loop Slider */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in-up overflow-hidden relative">
        <h3 className="text-xl sm:text-2xl font-bold text-navy text-center mb-6 sm:mb-8 animate-fade-in-up relative z-10">
          Prime Recruiters
        </h3>
        
        {/* Moving Circles Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large Rotating Circle */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-200/30 rounded-full animate-rotate-3d"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-purple-200/30 rounded-full animate-rotate-3d-reverse"></div>
          
          {/* Medium Circles */}
          <div className="absolute top-1/2 left-1/6 w-16 h-16 border border-accent/20 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 right-1/6 w-20 h-20 border border-purple-300/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          
          {/* Small Circles */}
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-400/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-purple-400/10 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-2/3 left-2/3 w-4 h-4 bg-accent/20 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          
          {/* Loop Sliding Circles */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-slide-loop-x"></div>
            <div className="absolute top-3/4 w-2 h-2 bg-gradient-to-r from-purple-400 to-accent rounded-full animate-slide-loop-y"></div>
            <div className="absolute left-1/4 w-2 h-2 bg-gradient-to-r from-accent to-blue-400 rounded-full animate-slide-loop-diagonal"></div>
            <div className="absolute right-1/4 w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-slide-loop-reverse"></div>
          </div>
          
          {/* Orbiting Elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-40 h-40">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400/60 rounded-full animate-orbit"></div>
              <div className="absolute top-1/2 right-0 transform translate-y-1/2 w-2 h-2 bg-purple-400/60 rounded-full animate-orbit" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent/60 rounded-full animate-orbit" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-2 bg-blue-400/60 rounded-full animate-orbit" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Infinite Loop Slider Container */}
        <div className="relative z-10">
          {/* Slider Track */}
          <div className="relative overflow-hidden">
            <div className="flex animate-infinite-slide">
              {/* First Set of Logos */}
              {recruiterLogos.map((logo, idx) => (
                <div 
                  key={`first-${idx}`} 
                  className="group relative flex-shrink-0 mx-4 sm:mx-6"
                  onMouseEnter={() => setHoveredLogo(idx)}
                  onMouseLeave={() => setHoveredLogo(null)}
                >
                  {/* 3D Card Container */}
                  <div className={`
                    bg-white rounded-lg shadow-lg p-3 sm:p-4 flex items-center justify-center h-16 sm:h-20 w-24 sm:w-32
                    transition-all duration-700 ease-out transform-gpu
                    ${hoveredLogo === idx 
                      ? 'rotate-y-12 scale-110 shadow-2xl translate-z-8' 
                      : 'rotate-y-0 scale-100 shadow-lg translate-z-0'
                    }
                    hover:rotate-y-6 hover:scale-105 hover:shadow-xl
                    animate-slide-in-up
                  `} style={{
                    animationDelay: `${idx * 0.1}s`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}>
                    
                    {/* Logo with 3D effect */}
                    <img 
                      src={logo} 
                      alt="Recruiter Logo" 
                      className={`
                        max-h-8 sm:max-h-12 object-contain mx-auto transition-all duration-500
                        ${hoveredLogo === idx 
                          ? 'scale-125 filter brightness-110' 
                          : 'scale-100'
                        }
                      `}
                      style={{
                        transform: hoveredLogo === idx ? 'translateZ(20px)' : 'translateZ(0px)',
                        filter: hoveredLogo === idx ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' : 'none'
                      }}
                    />
                    
                    {/* 3D Glow Effect */}
                    <div className={`
                      absolute inset-0 rounded-lg transition-all duration-500
                      ${hoveredLogo === idx 
                        ? 'bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-100' 
                        : 'opacity-0'
                      }
                    `}></div>
                    
                    {/* Floating Particles Effect */}
                    <div className={`
                      absolute inset-0 overflow-hidden rounded-lg
                      ${hoveredLogo === idx ? 'opacity-100' : 'opacity-0'}
                      transition-opacity duration-500
                    `}>
                      {[...Array(6)].map((_, particleIdx) => (
                        <div
                          key={particleIdx}
                          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 3D Shadow */}
                  <div className={`
                    absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 
                    bg-black/10 rounded-full blur-sm transition-all duration-500
                    ${hoveredLogo === idx ? 'scale-110 opacity-60' : 'scale-100 opacity-40'}
                  `}></div>
                </div>
              ))}
              
              {/* Duplicate Set for Seamless Loop */}
              {recruiterLogos.map((logo, idx) => (
                <div 
                  key={`second-${idx}`} 
                  className="group relative flex-shrink-0 mx-4 sm:mx-6"
                  onMouseEnter={() => setHoveredLogo(idx)}
                  onMouseLeave={() => setHoveredLogo(null)}
                >
                  {/* 3D Card Container */}
                  <div className={`
                    bg-white rounded-lg shadow-lg p-3 sm:p-4 flex items-center justify-center h-16 sm:h-20 w-24 sm:w-32
                    transition-all duration-700 ease-out transform-gpu
                    ${hoveredLogo === idx 
                      ? 'rotate-y-12 scale-110 shadow-2xl translate-z-8' 
                      : 'rotate-y-0 scale-100 shadow-lg translate-z-0'
                    }
                    hover:rotate-y-6 hover:scale-105 hover:shadow-xl
                    animate-slide-in-up
                  `} style={{
                    animationDelay: `${idx * 0.1}s`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}>
                    
                    {/* Logo with 3D effect */}
                    <img 
                      src={logo} 
                      alt="Recruiter Logo" 
                      className={`
                        max-h-8 sm:max-h-12 object-contain mx-auto transition-all duration-500
                        ${hoveredLogo === idx 
                          ? 'scale-125 filter brightness-110' 
                          : 'scale-100'
                        }
                      `}
                      style={{
                        transform: hoveredLogo === idx ? 'translateZ(20px)' : 'translateZ(0px)',
                        filter: hoveredLogo === idx ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' : 'none'
                      }}
                    />
                    
                    {/* 3D Glow Effect */}
                    <div className={`
                      absolute inset-0 rounded-lg transition-all duration-500
                      ${hoveredLogo === idx 
                        ? 'bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-100' 
                        : 'opacity-0'
                      }
                    `}></div>
                    
                    {/* Floating Particles Effect */}
                    <div className={`
                      absolute inset-0 overflow-hidden rounded-lg
                      ${hoveredLogo === idx ? 'opacity-100' : 'opacity-0'}
                      transition-opacity duration-500
                    `}>
                      {[...Array(6)].map((_, particleIdx) => (
                        <div
                          key={particleIdx}
                          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 3D Shadow */}
                  <div className={`
                    absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 
                    bg-black/10 rounded-full blur-sm transition-all duration-500
                    ${hoveredLogo === idx ? 'scale-110 opacity-60' : 'scale-100 opacity-40'}
                  `}></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Overlays for Smooth Edges */}
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
        
        {/* Additional Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-80"></div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in-up">
        <h3 className="text-xl sm:text-2xl font-bold text-navy text-center mb-6 sm:mb-8 animate-fade-in-up">
          Meet Our Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 stagger-animation">
          {teamPhotos.map((member, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center hover-lift hover-glow transition-all duration-300 group border border-gray-100"
            >
              <img 
                src={member.img} 
                alt={member.name} 
                className="h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 object-cover rounded-full mb-4 sm:mb-6 border-4 border-purple-700 transition-transform duration-300 group-hover:scale-110 shadow-lg" 
              />
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-navy mb-2">{member.name}</div>
              <div className="text-purple-700 font-semibold text-base sm:text-lg lg:text-xl">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Team Photo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 animate-fade-in-up">
        <h3 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-6 sm:mb-8 animate-fade-in-up">
          Student Team (A.Y. 2023-24)
        </h3>
        <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift transition-all duration-300 border-4 border-gray-100">
          <img 
            src={studentTeamImg} 
            alt="Student Team" 
            className="w-full object-cover h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] transition-transform duration-300 hover:scale-105" 
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Our dedicated student team working together to ensure successful placements and career development opportunities for all students.
          </p>
        </div>
      </section>
    </div>
  );
} 