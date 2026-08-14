# Movie Phim Service 🎬

Phim Service là Microservice chịu trách nhiệm quản lý thông tin phim trong hệ thống đặt vé xem phim.

Service xử lý:

- Danh sách phim
- Banner phim
- Tìm kiếm phim
- Phân trang phim
- Lọc phim theo ngày
- Chi tiết phim
- Thêm phim
- Cập nhật phim
- Upload hình ảnh phim
- Xóa phim

Phim Service giao tiếp với Gateway thông qua RabbitMQ.

---

# Architecture

```
                         Client
                           |
                           |
                           v

                    +-------------+
                    |   Gateway   |
                    |   NestJS    |
                    +-------------+

                           |
                           |
                      RabbitMQ

                           |
                           v

                    +-------------+
                    | Phim Service|
                    |   NestJS    |
                    +-------------+

                           |
                           v

                    MySQL Database
```

---

# Technology Stack

## Backend

- Node.js
- NestJS
- TypeScript

## Database

- Prisma ORM
- MySQL

## Communication

- RabbitMQ

## Upload Image

- Multer
- Cloudinary

## Documentation

- Swagger

## Deployment

- Docker
- Docker Compose
- GitHub Actions
- Docker Hub

---

# Project Structure

```
phim-service

├── src

│
├── module-api
│
│   └── quan-ly-phim
│       │
│       ├── dto
│       │   ├── them-phim.dto.ts
│       │   └── capNhatPhim.dto.ts
│       │
│       ├── quan-ly-phim.controller.ts
│       ├── quan-ly-phim.service.ts
│       └── quan-ly-phim.module.ts
│
│
├── module-system
│
│   ├── prisma
│   ├── cloudinary
│   └── token
│
├── prisma
│
├── Dockerfile
├── package.json
└── README.md
```

---

# API Documentation

Swagger:

```
http://localhost:3069/api-docs
```

Swagger hỗ trợ:

- API Testing
- Query Parameters
- Request Body
- JWT Bearer Token
- Multipart File Upload

---

# Movie APIs

## 1. Lấy danh sách banner phim

API:

```
GET

/api/QuanLyPhim/LayDanhSachBanner
```

Mục đích:

Lấy danh sách banner phim.

---

# 2. Lấy danh sách phim


API:

```
GET

/api/QuanLyPhim/LayDanhSachPhim
```


Query:

```
tenPhim
```


Example:

```
/LayDanhSachPhim?tenPhim=Avengers
```


Parameter:

| Parameter | Type | Required |
|-|-|-|
| tenPhim | string | false |


---

# 3. Lấy danh sách phim phân trang


API:

```
GET

/api/QuanLyPhim/LayDanhSachPhimPhanTrang
```


Query:

```
tenPhim

soTrang

soPhanTuTrenTrang
```


Example:

```
?tenPhim=Avengers
&soTrang=1
&soPhanTuTrenTrang=20
```


Default:

```
soTrang = 1

soPhanTuTrenTrang = 20
```

---

# 4. Lấy danh sách phim theo ngày


API:

```
GET

/api/QuanLyPhim/LayDanhSachPhimTheoNgay
```


Query:

```
tuNgay

denNgay

tenPhim

soTrang

soPhanTuTrenTrang
```


Example:

```
?tuNgay=2026-01-01
&denNgay=2026-12-31
&soTrang=1
&soPhanTuTrenTrang=20
```

---

# 5. Lấy thông tin phim


API:

```
GET

/api/QuanLyPhim/LayThongTinPhim
```


Query:

```
maPhim
```


Example:

```
/LayThongTinPhim?maPhim=1
```


Response:

```json
{
    "maPhim":1,
    "tenPhim":"Avengers",
    "hinhAnh":"image_url"
}
```

---

# 6. Thêm phim upload hình


API:

```
POST

/api/QuanLyPhim/ThemPhimUploadHinh
```


Content-Type:

```
multipart/form-data
```


Body:

```
tenPhim
trailer
moTa
frm
```


Example:

```
tenPhim:
Avengers


trailer:
https://youtube.com/...


moTa:
Movie description


frm:
poster.jpg
```


Flow:

```
Gateway

 |

RabbitMQ

 |

Phim Service

 |

Upload Cloudinary

 |

Save Database
```

---

# 7. Cập nhật phim upload hình


API:

```
POST

/api/QuanLyPhim/CapNhatPhimUpload
```


Require:

```
Bearer Token
```


Header:

```http
Authorization: Bearer <access_token>
```


Content-Type:

```
multipart/form-data
```


Body:

```
maPhim

tenPhim

trailer

moTa

ngayKhoiChieu

danhGia

hot

dangChieu

sapChieu

frm
```


Example:

```
maPhim:
1


tenPhim:
Avengers Endgame


danhGia:
9


hot:
true


dangChieu:
true


sapChieu:
false


frm:
poster.jpg
```


---

# 8. Xóa phim


API:

```
DELETE

/api/QuanLyPhim/XoaPhim
```


Require:

```
Bearer Token
```


Header:

```http
Authorization: Bearer <access_token>
```


Query:

```
maPhim
```


Example:

```
/XoaPhim?maPhim=1
```


---

# Authentication & Authorization


Một số API yêu cầu quyền quản trị:


Ví dụ:

```
CapNhatPhimUpload

XoaPhim
```


Flow:

```
Client

 |

Bearer Token

 |

Gateway

 |

Verify JWT

 |

Phim Service

 |

Check Role QuanTri

 |

Execute Action
```

---

# RabbitMQ Communication


Flow:

```
Client

 |

HTTP Request

 |

Gateway

 |

RabbitMQ

 |

Phim Service

 |

Database
```


---

# Cloudinary Upload


Phim Service sử dụng Cloudinary để lưu hình ảnh.


Flow:

```
Upload Image

      |

Multer

      |

Buffer

      |

Cloudinary

      |

Image URL

      |

MySQL
```

---

# Environment Variables


Tạo:

```
.env
```


Example:

```env
PORT=3072


DATABASE_URL=mysql://root:password@database:3306/db_movie


RABBITMQ_URL=amqp://user:password@rabbitmq:5672


JWT_SECRET_KEY=your_secret


CLOUDINARY_URL=your_cloudinary_url
```

---

# Installation


Install dependencies:

```bash
npm install
```

---

# Run Application


Development:

```bash
npm run start:dev
```


Build:

```bash
npm run build
```


Production:

```bash
npm run start:prod
```

---

# Docker


Build image:

```bash
docker build \
-t phonghuynh1501/img-phim-service:latest .
```


Push Docker Hub:

```bash
docker push phonghuynh1501/img-phim-service:latest
```


Run:

```bash
docker compose up -d
```

---

# CI/CD Flow


```
Developer

    |

git push main

    |

GitHub Actions CI

    |

Docker Build

    |

Docker Hub

    |

GitHub Actions CD

    |

EC2 Self-hosted Runner

    |

Docker Compose Deploy
```

---

# Related Services


## Gateway

Repository:

https://github.com/huynhtuanphong1501/-movie--gateway


## User Service

Repository:

https://github.com/huynhtuanphong1501/-movie--user-service


## Rap Service

Repository:

https://github.com/huynhtuanphong1501/-movie--rap-service


## Dat Ve Service

Repository:

https://github.com/huynhtuanphong1501/-movie--dat-ve-service


---

# Author

**Huynh Tuan Phong**

Movie Management System

Microservices Architecture
