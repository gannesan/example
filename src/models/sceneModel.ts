export class SceneModel {
    pitchRange_MIN :number = -90;
    pitchRange_MAX :number = 90;
    yawRange_MIN: number = -180;
    yawRange_MAX: number = 180;
    angle_MIN:number = -90;
    angle_MAX:number = 90;
    protected static SInit = (() => {
        SceneModel.prototype.pitchRange_MAX = 90;
        SceneModel.prototype.pitchRange_MIN = -90;
        SceneModel.prototype.yawRange_MAX = 180;
        SceneModel.prototype.yawRange_MIN = -180;
        SceneModel.prototype.angle_MAX = 90;
        SceneModel.prototype.angle_MIN = -90;
    })();
}