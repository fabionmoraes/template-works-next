import React from 'react'
import Link from 'next/link'

import { Fade } from 'react-awesome-reveal'

import { IWork } from 'pages/api/works'

import { GridLayout } from 'components/Layout/grid'

import { Grid, List } from './styles'

interface IGridList {
  works: IWork[]
  search: string[]
  handleLanguage(event: string): void
}

export const GridList: React.FC<IGridList> = ({
  works,
  search,
  handleLanguage,
}) => {
  return (
    <Grid>
      <Fade>
        {works.map((work, index) => (
          <GridLayout key={String(index)}>
            <List featured={work.featured}>
              <Link href="/">
                <a>
                  <div className="logo-description">
                    <div className="logo">
                      <img src={work.logo} alt={work.company} />
                    </div>
                    <div className="description">
                      <div className="sub-title">
                        {work.company}{' '}
                        <div className="tags">
                          {work.new && <div className="new">NEW!</div>}
                          {work.featured && (
                            <div className="featured">FEATURED</div>
                          )}
                        </div>
                      </div>
                      <div className="title">{work.position}</div>
                      <div className="footer">
                        <ul>
                          <li>{work.postedAt}</li>
                          <li>{work.contract}</li>
                          <li>{work.location}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="grid-languages">
                    {work.languages.map((lang, i) => (
                      <button
                        type="button"
                        key={String(i)}
                        onClick={() => handleLanguage(lang)}
                        disabled={search.includes(lang)}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </a>
              </Link>
            </List>
          </GridLayout>
        ))}
      </Fade>
    </Grid>
  )
}
