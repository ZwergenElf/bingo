import { Injectable } from '@angular/core';

export function interceptHttp(req: any, next: any) {
  const modifiedReq = req.clone({
    withCredentials: true,
  });
  return next(modifiedReq);
}
