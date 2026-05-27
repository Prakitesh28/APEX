"use client"

import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"

let registered = false

export function registerGsapEases() {
  if (registered) return
  gsap.registerPlugin(CustomEase)
  CustomEase.create("cinematic", "M0,0 C0.16,1 0.3,1 1,1")
  CustomEase.create("breathe", "M0,0 C0.4,0 0.2,1 0.5,1")
  CustomEase.create("emerge", "M0,0 C0,0.8 0.1,1 1,1")
  CustomEase.create("snap", "M0,0 C0.7,-0.4 0.4,1.4 1,1")
  registered = true
}
