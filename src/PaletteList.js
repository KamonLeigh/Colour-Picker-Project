import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import { CSSTransition, TransitionGroup} from "react-transition-group"
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const { palettes, classes } = this.props;
        return (
          <div className={classes.root}>
            <div className={classes.container}>
              <nav className={classes.nav}>
                <h1 className={classes.heading}>Colours Palette</h1>
                <Link to="/palette/new">Create Palette</Link>
              </nav>
                <TransitionGroup className={classes.palettes}>
                  {palettes.map(palette => (
                    <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                      <MiniPalette
                        {...palette}
                        handleDelete={this.props.removePalette}
                        handleClick={() => this.goToPalette(palette.id)}
                        key={palette.id}
                        id={palette.id}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
            </div>
          </div>
        );
    }
}

export default withStyles(styles)(PaletteList);