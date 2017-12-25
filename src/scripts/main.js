import initController from './parts/controller'
import screenBuilder from './parts/screenBuilder'

initController()
screenBuilder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildPage1')
