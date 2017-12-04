import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core'
import { LaravelService } from '../laravel.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public estagiarios
  private estagiariosOriginal
  sort
  private cresOrDesc

  constructor(
    private lara: LaravelService,
    private router: Router,
    private el: ElementRef,
    private render: Renderer2
  ) {
    render.listen(el.nativeElement, 'click', e => {
      if (e.target.className === 'thead') this.order(e)
    })
  }

  search(word) {
    this.estagiarios =
      this.estagiariosOriginal
        .filter(ind =>
          Object.keys(ind)
            .some(k => (ind[k].toString().toLowerCase().indexOf(word) !== -1))
        )
  }

  order(e = null) {
    let table = []
    let counter = 0

    if (e) {
      const name = e.target.attributes.name.nodeValue

      table = this.estagiariosOriginal.sort((a, b) => {
        if (a[name] < b[name])
          return this.cresOrDesc ? 1 : -1
        if (a[name] > b[name])
          return this.cresOrDesc ? -1 : 1
        return 0
      })
      counter++
    }

    if (!this.cresOrDesc)
      this.cresOrDesc = 1
    else
      this.cresOrDesc = 0


    if (counter)
      this.estagiarios = table
    else
      this.estagiarios = this.estagiariosOriginal

  }

  handleClick(e) {
    const id = e.getAttribute('id')
    this.router.navigate([`/estagiario/${id}`])
  }

  ngOnInit() {
    this.lara.estagiarios().subscribe(res => this.estagiarios = this.estagiariosOriginal = res.json())
    this.lara.sessionChecker()
  }

}
